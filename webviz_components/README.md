# Webviz Components for Dash

This repository contains Webviz components for Dash
Example usage is documented here: https://github.com/Statoil/webviz-dash-examples

## Installing

Components can be installed using the following command.
Replace `[version_name]` with latest available version branch.
```
pip install -e git+ssh://git@github.com/Statoil/webviz-dash.git@[version_name]#egg=webviz-components&subdirectory=webviz_components
```

## Development

### Requirements

Create a virtual environment in the project root and install dev-requirements from there

from root

```
pip install -r dev-requirements
```

from this directory
```
npm install
```

### Testing

Setup and install the dependencies for testsing:
```
npm install
npm run test
```

### Create a build

Before being able to run the component

```
npm run build:js
npm run build:js-dev
npm run build:py
```
