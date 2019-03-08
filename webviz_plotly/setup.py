from setuptools import setup, find_packages

setup(
    name='webviz_plotly',
    version='0.0.1',
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
    zip_safe=False
)
