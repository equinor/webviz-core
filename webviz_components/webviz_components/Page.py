# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Page(Component):
    """A Page component.


Keyword arguments:
- children (a list of or a singular dash component, string or number; optional): The content of the page.
- id (string; required): The ID of this component, used to identify dash components
in callbacks. The ID needs to be unique across all of the
components in an app.
- title (string; required): The title of this page. Will be displayed in the menu."""
    @_explicitize_args
    def __init__(self, children=None, id=Component.REQUIRED, title=Component.REQUIRED, **kwargs):
        self._prop_names = ['children', 'id', 'title']
        self._type = 'Page'
        self._namespace = 'webviz_components'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'title']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in ['id', 'title']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(Page, self).__init__(children=children, **args)
