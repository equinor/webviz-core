import json
import os
from setuptools import setup

long_description = ""
with open("../README.md", "r") as fh:
    long_description = fh.read()

with open(os.path.join("webviz_components", "package.json")) as f:
    package = json.load(f)

package_name = package["name"].replace(" ", "_").replace("-", "_")

setup(
    name=package_name,
    version=package["version"],
    author=package["author"],
    packages=[package_name],
    include_package_data=True,
    license=package["license"],
    description=package["description"] if "description" in package else package_name,
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/equinor/webviz-core/tree/master/webviz_components",
    install_requires=[],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: GNU Lesser General Public License v3 (LGPLv3)"
    ],
)
