import pandas as pd
import pytest
from webviz_plotly.graph_objs import TornadoPlot


@pytest.fixture
def test_data():
    return pd.DataFrame(
        {'low': [0.5, -0.7, -.5, -0.1], 'high': [0.8, 1, 0.3, 0.4]},
        index=['A', 'B', 'C', 'D']
    )


def test_tornado_plot_figure_should_contain_correct_layout(test_data):
    figure = TornadoPlot(test_data.iterrows())
    assert figure['layout']['barmode'] == 'relative'


def test_tornado_plot_figure_should_have_correct_data_traces(test_data):
    figure = TornadoPlot(test_data.iterrows())
    assert len(figure['data']) == 2

    for data in figure['data']:
        assert data['orientation'] == 'h'
        assert 'marker' in data
        assert list(data['y']) == list(test_data.index)
