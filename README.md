# Webviz Core

Equinor toolbox for working with [plotly](https://plot.ly) visualizations. This
project contains two packages

    * webviz_plotly
    * webviz_components

## webviz_plotly

Specialized [plotly](https://plot.ly) visualizations for working with reservior modelling.

## webviz_components

[Dash](https://plot.ly/products/dash/) components, some utilities for easily building
dashboards and visualizations not made using plotly.

# Build and Install

    pushd webviz_components && npm install && npm run build:all && pip install . ; popd
    pushd webviz_plotly && pip install . ; popd


# Usage

See [plotly reference documentation](https://plot.ly/python/reference/) and the
`examples/` folder.
