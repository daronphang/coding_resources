## Click

Python package used for creating command line interfaces in a composable way with as little code as necessary.

```py
import click


@click.command()
@click.option("--count", default=1, help="Number of greetings.")    # adding parameters
@click.option("--name", prompt="Your name", help="The person to greet.")
def hello(count, name):
    # --count must match with arg count
    for _ in range(count):
        click.echo(f"Hello, {name}!")


if __name__ == '__main__':
    hello()
```

```console
$ python3 example.py --help
$ python3 example.py --count 5
```

## Setuptools

When writing CLI, it is recommended to write them as modules that are distributed with setup-tools instead of __main__.

1. Traditional approach loads the first module with an "incorrect" name i.e. interpreter renames it to __main__ and does not call by its actual name. Importing another module will trigger importing twice.
2. Trick only works if the script is a Python module; if app grows too large may want to start using a package.

To bundle script with setuptools, need two files:

```
yourscript.py
setup.py
```

```py
# yourscript

import click

@click.command()
def myhello():
    click.echo('Hello World!')
```

```py
from setuptools import setup

setup(
    name='myhello',
    version='0.1.0',
    packages=find_packages(),
    include_package_data=True,
    py_modules=['yourscript'],
    install_requires=[
        'Click',
    ],
    entry_points={
        # each line identifies one console script
        # before = is the name of the script that should be generated
        # second part is the import path followed by : with the click command
        'console_scripts': [
            'yourscript = yourpackage.scripts.myhello:cli'
        ],
    },
)
```

```console
$ virtualenv venv
$ source venv/bin/activate
$ pip install --editable .
$ myhello
```

## Commands

Click is based on declaring commands through decorators. Decorator converts the function into a Command which then can be invoked.

```py
@click.command()
def hello():
    click.echo('Hello World!')

if __name__ == '__main__':
    hello()
``` 

### Nesting Commands

Commands can be attached to other commands of type Group.

```py
@click.group()
def cli():
    pass

@click.command()
def initdb():
    click.echo('Initialized the database')

@click.command()
def dropdb():
    click.echo('Dropped the database')

cli.add_command(initdb)
cli.add_command(dropdb)
```

## Password Confirmation

```py
import click


@click.command()
@click.option("--username", prompt="Your username", help="Your username.")
@click.password_option()
def cli(username, password):
    click.echo(f'{username}, {password}')
```