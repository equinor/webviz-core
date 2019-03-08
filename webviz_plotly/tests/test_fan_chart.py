import pandas as pd
import pytest
from webviz_plotly.graph_objs import FanChart


@pytest.fixture
def test_data():
    return pd.DataFrame({
        'index': ['02-03-2006'],
        'name': ['line-1'],
        'mean': [4],
        'p10': [2],
        'p90': [4],
        'max': [6],
        'min': [1]
    })


@pytest.fixture
def test_observations():
    return pd.DataFrame({
        'index': ['02-03-2006'],
        'name': ['line-1'],
        'value': [4],
        'error': [2]
    })


def test_fan_chart_contains_scatter_data(test_data, test_observations):
    figure = FanChart(test_data.iterrows(), test_observations.iterrows())
    assert all(map(lambda trace: trace.type == 'scatter', figure['data']))


def test_fan_chart_one_marker_per_observation(test_data, test_observations):
    figure = FanChart(test_data.iterrows(), test_observations.iterrows())
    markers = list(filter(lambda t: t.mode == 'markers', figure['data']))
    assert len(markers) == len(test_observations)
