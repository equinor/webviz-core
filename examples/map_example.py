import dash
import dash_html_components as html
import pandas as pd
from pandas.compat import StringIO
from webviz_components import (Layout, Map, Page)
from os import path

path_to_data = path.join(path.dirname(__file__), "reek.csv")

cells = pd.read_csv(StringIO("""
i,j,k,x0,y0,x1,y1,x2,y2,x3,y3,value,FLOWI+,FLOWJ+
0,0,0,0,0,1,0,1,1,0,1,1,0.005,0.0025
1,0,0,1,0,2,0,2,1,1,1,0,0.002,0.0045
0,1,0,0,1,1,1,1,2,0,2,4,0.001,0.0025
1,1,0,1,1,2,1,2,2,1,2,2,0.004,0.0035
"""))

app = dash.Dash(__name__, external_stylesheets=['assets/theme.css'])
server = app.server

app.css.config.serve_locally = True
app.scripts.config.serve_locally = True


app.layout = Layout(
    children=[
        Page(
            id='reek',
            title='Map with Reek data',
            children=[
                html.H1(children='Reek'),
                html.P(children='''
                    This is an example of Map using Reek data
                '''),
                Map(id='reek-map', data=pd.read_csv(path_to_data).to_json())
            ]
        ),
        Page(
            id='simple-map',
            title='Simple Map',
            children=[
                html.H1(children='Map'),
                html.P(children='''
                    This is an example of how to use Map
                '''),
                Map(id='flow-map', data=cells.to_json())
            ]
        )]
)


if __name__ == '__main__':
    app.run_server(debug=True)
