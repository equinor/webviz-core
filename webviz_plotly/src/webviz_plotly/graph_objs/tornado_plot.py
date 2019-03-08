from plotly.graph_objs import Figure, Layout, Bar
from plotly.graph_objs.bar import Marker
from plotly.graph_objs.bar.marker import Line


def calc_low_base(low, high):
    """
    From the low and high value of a parameter,
    calculates the base (starting x value) of the
    bar visualizing low values.
    >>> calc_low_base(1, 2)
    1
    >>> calc_low_base(-2, -1)
    -1
    >>> calc_low_base(-1, 1)
    0
    """
    if low < 0:
        return min(0, high)
    return low


def calc_high_base(low, high):
    """
    From the low and high value of a parameter,
    calculates the base (starting x value) of the bar
    visualizing high values.
    >>> calc_high_base(1, 2)
    1
    >>> calc_high_base(-1, 1)
    0
    >>> calc_high_base(1, 2)
    1
    """
    if high > 0:
        return max(0, low)
    return high


def calc_high_x(low, high):
    """
    From the low and high value of a parameter,
    calculates the x-value (length of bar) of the bar
    visualizing high values.
    >>> calc_high_x(-1, 1)
    1
    >>> calc_high_x(0.5, 1)
    0.5
    >>> calc_high_x(-4, -3)
    0
    """
    if high > 0:
        base = max(0, low)
        return high - base
    return 0


def calc_low_x(low, high):
    """
    From the low and high value of a parameter,
    calculates the x-value (length of bar) of the bar
    visualizing low values.
    >>> calc_low_x(-1, 1)
    -1
    >>> calc_low_x(-1, -0.5)
    -0.5
    >>> calc_low_x(1, 3)
    0
    """
    if low < 0:
        base = min(0, high)
        return low - base
    return 0


class TornadoPlot(Figure):
    def __init__(
            self,
            data,
            low_color='rgba(0,0,255,1.0)',
            high_color='rgba(255,0,0,1.0)',
            *args, **kwargs):
        """Tornado plot figure.
        :param data: iterable of touples: (label, {'low': low_value, 'high':
            high_value}).
        """
        high_y = []
        high_x = []
        high_base = []

        low_y = []
        low_x = []
        low_base = []

        for index, row in data:
            low_x.append(calc_low_x(row['low'], row['high']))
            high_x.append(calc_high_x(row['low'], row['high']))
            low_base.append(calc_low_base(row['low'], row['high']))
            high_base.append(calc_high_base(row['low'], row['high']))
            high_y.append(index)
            low_y.append(index)

        low_bars = self.create_bars(
            name='low',
            color=low_color,
            y=low_y,
            x=low_x,
            base=low_base
        )

        high_bars = self.create_bars(
            name='high',
            color=high_color,
            y=high_y,
            x=high_x,
            base=high_base
        )

        data_out = [low_bars, high_bars]
        super(TornadoPlot, self).__init__(
            data=data_out,
            layout=Layout(barmode='relative', showlegend=False),
            *args,
            **kwargs
        )

    @staticmethod
    def create_bars(name, color, y, x, base):
        return Bar(
            name=name,
            x=x,
            y=y,
            base=base,
            orientation='h',
            marker=Marker(
                color=color
            )
        )
