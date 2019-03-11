from setuptools import setup, find_packages

long_description = ""
with open("../README.md", "r") as fh:
    long_description = fh.read()

setup(
    name='webviz_plotly',
    version='0.0.1',
    author='Equinor',
    author_email='ejah@equinor.com',
    description='Equinor visualizations for plotly.',
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/equinor/webviz-core/tree/master/webviz_plotly",
    packages=find_packages("src"),
    package_dir={"": "src"},
    test_suite="setup.discover_test_suite",
    install_requires=[
        'plotly', 'pandas', 'matplotlib'
    ],
    setup_requires=[
        'pytest-runner'
    ],
    tests_require=[
        'pytest', 'mock', 'pycodestyle'
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: GNU Lesser General Public License v3 (LGPLv3)"
    ],
    zip_safe=False
)
