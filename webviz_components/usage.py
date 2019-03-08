import webviz_components
import dash
from dash.dependencies import Input, Output
import dash_html_components as html

app = dash.Dash(__name__)

app.scripts.config.serve_locally = True
app.css.config.serve_locally = True

app.layout = html.Div([
    webviz_components.Page(
        id='input',
        title='my-title',
        children=[]
    ),
    html.Div(id='output')
])

@app.callback(Output('output', 'children'), [Input('input', 'title')])
def display_output(title):
    return 'Page has title {}'.format(title)


if __name__ == '__main__':
    app.run_server(debug=True)
