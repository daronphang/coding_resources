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

## Memory Management

Values of objects are stored in memory for quick access. In early programming languages, developers were responsible for managing memory in their programs i.e. to allocate memory for a variable before creating an object, and deallocating it to free that memory for other objects. However, this leads to memory leaks and freeing up of memory too soon.

With automatic memory management, runtime handles this for programmers. Python uses two strategies for memory allocation: reference counting and garbage collection.

### Reference Counting

Reference counting works by counting the number of times an object is referenced by other objects. When the count becomes zero, it is unusable by program code and is deallocated.

### Garbage Collection

However, automatic memory management comes at a cost, whereby it requires to use additional memory and computation to track all of its references. Moreover, reference counting does not work for cyclic references i.e. a situation when an object refers to itself.

As reference cycles take computational work to discover, garbage collection must be a scheduled activity. Python schedules garbage collection based upon a threshold of object allocations and deallocations. When the number of allocations is greater than the number of deallocations, garbage collector is executed.

Can be invoked manually during the execution of a program. Never disable garbage collector unless you have a good reason to do so.

```py
import gc

print("Garbage collection thresholds:", gc.get_threshold())

# invoking manually
collected = gc.collect()
print "Garbage collector: collected %d objects." % (collected)
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
