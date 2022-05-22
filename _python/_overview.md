## Virtual Environment

Developers often deal with Python projects where they have to use module/packages that are not part of Python standard library i.e. version is 3.6 but requires 2.6 for a particular application.

Solution is to create venv, a self-contained folder that contains required executables to use packages without affecting the global Python intepreter installed in os. Useful to prevent package clutter and version conflicts. Codes executed in cmd.

```console
$cd /d C:\users\daronphang
$virtualenv venv
$venv\Scripts\activate
$deactivate

# Bash
$source venv/Scripts/activate

$cd venv/Scripts
$. activate
$deactivate
```

### Requirements.txt

A text file containing the venv packages and versions required to run the Python program.

```console
$pip install -r requirements.txt
$pip freeze > requirements.txt         Create txt file
$pip freeze --all > requirements.txt
$pip list
```

### Common Mistakes

If need to rename directory folder, best is to create requirements.txt file and recreating virtualenv folder as the venv path will be broken.

## Python Path

```python
import sys
print(sys.executable)
```

```console
$where python
```

### Retrieve Path of Root Project Structure

```python
import os

basedir = os.path.abspath(os.path.dirname(__file__))    # __file__ must be in top level directory of the project
print(basedir)
```

### Getting CWD

```python
import os

os.chdir(b'H:\tech\SECURE\test')   # need convert to bytes
print(os.getcwd())                  # prints absolute path 'H:/tech/SECURE/test'

os.chdir(os.path.join(os.getcwd(), '\app')) # 'H:\tech\SECURE\test\app'
```

## Python Shell

Python is an intepreter language that executes code line by line. Python provides Python Shell, an environment that is used to execute a single Python command and display the result. To exit Shell, 'ctrl+z+enter'.

```
(venv) C:\Users\daronphang\pee_training_repo\daronphang\flask_toy_project>python
Python 3.7.9 (tags/v3.7.9:13c94747c7, Aug 17 2020, 18:58:18) [MSC v.1900 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> ^Z


(venv) C:\Users\daronphang\pee_training_repo\daronphang\flask_toy_project>
```

## Args/Kwargs

Both allow to pass a varying number of positional arguments. Both asterisks refer to the unpacking operator. The iterable object returned using unpacking operator is a tuple and not a list.

Kwargs refers to keyword arguments which accepts keyword i.e. unpacks into a dictionary.

```py
# args is just a convention name i.e. can call *integers or *numbers
def my_sum(*args):
    result = 0
    # iterating over args tuple
    for x in args:
        result += x
    return result

def concantenate(**kwargs):
    result = ''
    for arg in kwargs.values():
        result += arg
    return result

print(my_sum(1, 2, 3))
print(concantenate(first=1, second=2, third=3))
```

## Copying

Python never implicitly copies objects.

```py
dict2 = dict1 # both points to the same dictionary
dict2 = dict1.copy()
```

## Sequence Types & Destructuring

An ordered list of items. String, list, tuple, range, bytes and bytearray. Dictionaries are ordered from 3.6 onwards.

```py
# destructuring dict
from operator import itemgetter

params = {'a': 1, 'b': 2}
a, b = itemgetter('a', 'b')(params)

# spread operator in python
def multiply(a, b):
    return a * b
numbers = [3, 5]
print(multiply(*numbers))
```

## Type Conversions

Can use type() or isinstance()

```python
int()     'int'
float()   'float'
str()     'str'
tuple()   'tuple'
list()    'list'
dict()    'dict'
set()     'set'
```

## Subscriptable

Subscriptable objects are objects with a **getitem** method such as lists, dictionaries and tuples. Class methods are not subscriptable; instead, add another function that returns the method using inspect library.

```py
# subscriptable
"foobar"[3] == "b"
(1,2,3,4)[3] == 4
[1,2,3,4][3] == 4
{"a":1, "b":2, "c":3}["c"] == 3

class CrudOperations:
    def __init__(self, conn_payload, as_dict):
        self.conn_payload = conn_payload
        self.as_dict = as_dict
        self.update_user_settings = mssql_connection_crud_operation(conn_payload, as_dict)(self.update_user_settings)

    def get_attribute(self, method_name):
        if hasattr(self, method_name):
            return getattr(self, method_name)
        abort(400, 'crud method not found')

    def get_all_attributes(self, method_name):
        members = inspect.getmembers(self)
        for attribute, value in members:
            if method_name == attribute:
                return value
        abort(400, 'crud method not found')

    def get_instance_attributes(self, method_name):
        for attribute, value in self.__dict__.items():
            if method_name == attribute:
                return value
        abort(400, 'crud method not found')
```

## Inspect

Provides useful functions to help get information about live objects i.e. examine contents of class, retrieve source code of method, extract and format the argument list for a function, or get all information to display a detailed traceback for debugging.

```
isclass()
ismodule()
isfunction()
ismethod()
getmembers(object)    Returns all members of an object in a list of (name, value) pairs sorted by name
signature()           Helps understand the attributes which are to be passed onto a callable
```

```py
# Accepts wide range of Python callables including functions, classes, partial objects
from inspect import signature

def foo(a, *, b:int, **kwargs):
  pass

sig = signature(foo)
print(str(sig))  # '(a, *, b:int, **kwargs)'
```

```py
import inspect

class TestMixin:
    def get_class_attr(self):
        return str(inspect.signature(self.__class__))


class Test(TestMixin):
    def __init__(self, name, value):
        self.name = name
        self.value = value


test = Test('hello', 'world')

print(test.get_class_attr())
print(getattr(test, 'name'))
print(dir(test))
```
