# -*- coding: utf-8 -*-
from setuptools import setup, find_packages
from pip.req import parse_requirements
import re
import ast

# get version from __version__ variable in charity/__init__.py
_version_re = re.compile(r'__version__\s+=\s+(.*)')

with open('charity/__init__.py', 'rb') as f:
    version = str(
        ast.literal_eval(
            _version_re.search(f.read().decode('utf-8')).group(1)))

requirements = parse_requirements("requirements.txt", session="")

setup(
    name='charity',
    version=version,
    description='The Charity management system is a type of non-profit organization',
    author='Accurate Systems',
    author_email='info@accuratesystems.com.sa',
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=[str(ir.req) for ir in requirements],
    dependency_links=[str(ir._link) for ir in requirements if ir._link])
