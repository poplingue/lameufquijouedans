from setuptools import setup

setup(
    name='lameufquijouedans',
    packages=['lameufquijouedans'],
    include_package_data=True,
    install_requires=[
        'flask',
        'celery'
    ],
)
