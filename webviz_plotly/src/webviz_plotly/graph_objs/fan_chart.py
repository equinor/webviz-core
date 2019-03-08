from collections import defaultdict

from plotly.graph_objs import Figure, Layout, Scatter
from plotly.graph_objs.scatter import Line, Marker, Hoverlabel
from plotly.graph_objs.scatter.marker import ColorBar

import matplotlib.cm as cm


def rgba(r, g, b, a):
    return 'rgba({},{},{},{})'.format(r, g, b, a)


default_alpha_values = {
    'mean': 1,
    'p90': 0.5,
    'p10': 0.5,
    'min': 0.3,
    'max': 0.3
}


class DefaultFanChartColors:
    num_colors = 9
    color_scheme = cm.get_cmap('Set1')
    color_scheme2 = cm.get_cmap('Accent')

    def __iter__(self):
        for index in range(self.num_colors):
            yield self.color_scheme(index/self.num_colors)
        for index in range(self.num_colors):
            yield self.color_scheme2(index/self.num_colors)


class FanChart(Figure):
    def __init__(
            self,
            data,
            observations=(),
            colors=DefaultFanChartColors(),
            alpha_values=default_alpha_values,
            *args,
            **kwargs):
        """Fan chart figure.
        :param data: Iterable of tuples in the following format:
            (
                name,
                {
                    'p10': p10,
                    'p90': p90,
                    'mean': mean,
                    'max': max,
                    'min': min'
                }
            )
        :param observations: Iterable of touples in the following format:
            (name, {'value': v, 'error': err})
        """
        colors = iter(colors)
        layout = Layout()
        traces = []

        color_lookup = defaultdict(lambda: next(colors))
        xs = defaultdict(list)
        lines = defaultdict(lambda: defaultdict(list))

        for index, row in data:
            xs[row['name']].append(index)
            for column in ['p90', 'mean', 'p10', 'min', 'max']:
                lines[row['name']][column].append(row[column])

        for name, columns in lines.items():
            traces.append(Scatter(
                y=columns['mean'],
                x=xs[name],
                legendgroup=name,
                name=name,
                mode='lines',
                line=Line(color=rgba(*color_lookup[name][0:3], a=1.0))
            ))

            for column in ['p90', 'p10', 'min', 'max']:
                traces.append(init_confidence_band(
                    y=columns[column],
                    mean=columns['mean'],
                    x=xs[name],
                    line=name,
                    color=rgba(
                        *color_lookup[name][0:3],
                        a=alpha_values[column]
                    )
                ))

        if observations is not None:
            for i, row in observations:
                traces.append(make_observation(row, i))
                traces.append(
                    make_marker(
                        obs=row,
                        index=i,
                    )
                )
        super(FanChart, self).__init__(
            data=traces,
            layout=layout,
            *args,
            **kwargs
        )


def init_confidence_band(y, mean, x, line, color):
    """
    Makes a confidence band between mean and the corresponding
    confidence values (i.e. max, min, p90, p10).
    :param
        y: the confidence values.
        mean: mean value to be drawn backwards to fill area
        x: x-values both for mean and y values.
        line: id for belonging group
        color: color of line
    :returns: A trace representing a confidence band.
    """
    return Scatter(
        y=(y + mean[::-1]),
        x=(x + x[::-1]),
        legendgroup=line,
        name=line,
        fill='toself',
        mode='lines',
        hoverinfo='none',
        showlegend=False,
        fillcolor=color,
        line=Line(
            width=0
        )
    )


def make_observation(obs, index):
    """
    :param
        obs: DataFrame with columns 'value', 'error' and 'name'
        index: value for x-axis
    :returns: a line representing the error of the given observation.
    """
    return Scatter(
        y=[
            obs['value'] + obs['error'],
            obs['value'] - obs['error']
        ],
        x=[
            index,
            index
        ],
        showlegend=False,
        hoverinfo='none',
        text='',
        mode='lines',
        line=Line(
            color='#000',
            width=1
        )
    )


def make_marker(obs, index):
    """
    :param
        obs: Observation point containing 'value', 'index' and 'name'
        color: Same color as belonging line
    :returns: a marker for the value of the given observation.
    """
    return Scatter(
        y=[
            obs['value']
        ],
        x=[
            index
        ],
        showlegend=False,
        mode='markers',
        marker=Marker(
            color='#000',
        ),
        hoverlabel=Hoverlabel(
            bgcolor='#000'
        )
    )
