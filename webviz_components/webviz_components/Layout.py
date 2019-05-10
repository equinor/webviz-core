# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class Layout(Component):
    """A Layout component.


Keyword arguments:
- children (a list of or a singular dash component, string or number; optional): The content of the layout. Ideally a list of pages or a single page
- banner (optional): The banner is optional and is only the front page.
If you wish to have a banner provide dict containing a color or a url
and a title. banner has the following type: dict containing keys 'url', 'color', 'title'.
Those keys have the following types:
  - url (string; optional)
  - color (string; optional)
  - title (string; optional)
- basepath (string; optional)"""
    @_explicitize_args
    def __init__(self, children=None, banner=Component.UNDEFINED, basepath=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'banner', 'basepath']
        self._type = 'Layout'
        self._namespace = 'webviz_components'
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'banner', 'basepath']
        self.available_wildcard_properties =            []

        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in []:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(Layout, self).__init__(children=children, **args)
