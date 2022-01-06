### Args/Kwargs
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


### Copying
Python never implicitly copies objects.
```py
dict2 = dict1 # both points to the same dictionary
dict2 = dict1.copy()
```

```

### Sequence Types & Destructuring
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

### Operations
```python
a/b     # float
a//b    # integer
a % b   # remainder after integer division

sevens = range(7, 1000, 7)      // divisble by 7
```

### Working with Loops
Use either break, continue or pass to perform additional tasks in for loops or while loops:
- Break: provides opportunity to exit out of a loop if external condition is triggered
- Continue: skips over the part of a loop where an external condition is triggered but goes to complete rest of loop.
- Pass: tells program to disregard condition and conitnue to run program as usual.

```py
# break 
for number in range(10):
    if number == 5:
        break    # break here

    print('Number is ' + str(number))
    
# continue

```

### Type Conversions
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

### Strings and Slices
```python
'this string\n has been\n split'
tabbed\t strings
"""He said, "no, he's resting""""

parrot = "norwegian blue"
parrot[3]       # 'w', strings are sequence types
parrot[:6]      # ' norweg' 
parrot[:6:2]    # 'nre'
parrot[5::-1]   # 'gewron' 
parrot[:-5:-1]  # 'eulb'
parrot[::-1]    # prints entire string backwards

str.casefold()          # convert to lowercase, same as islower()
str.capitalize()        # same as isupper() 
str.count()             # returns no. of times a specified value occurs in string
str.find()
str.isnumeric()
len(string)

'a,b,c'.split(',')      # returns a list
",".join(iterable)
",".join(x if x not in separators else " " for x in number)
```

#### String Replacement
```python
txt = "one one was a race horse, two two was one too."
x = txt.replace("one", "three", 2)

print('my age is {0}, born in {1}'.format('12', '1993')
print('pi is approx {0:12}'.format(22/7))   # defualt for 15 decimals
{0:12f}   # default for 6 decimals
{0:12.50f}    # precision of 50 i.e. 50 points after decimal point

name = 'john'
age = 23
print(f'my name is {name}, age {age}')

print(x,y, sep='\n')
```

### Truthy vs Falsy
Use any() or all() to check for truth in lists.
```
# False
None
False
0
0.0
0j
'' 
()
{}
```

### Lists
```
append()
clear()
copy()
count()
extend()        Adds elements of a list/iterable to end of current list
index()         Returns index of first element with specified value
insert()        Adds element at specified position
pop()           Removes element at specified position
remove()        Removes first item with specified value
reverse()
sort()
```
```python
list = ['computer', 'monitor']
list[1][0]    # m

list.append(x)
list.sort(reverse=True)     # same as sorted(list, reverse=True)
list.sort(key=lambda x: x['some_key'])

del list[-n:]   # delete last n items from list

vowels = ['a', 'e', 'i', 'o', 'u']
vowels_iter = iter(vowels)

print(next(vowels_iter))    # 'a'
print(next(vowels_iter))    # 'e'

```

### Sets
Use sets to compare lists with lists or to output unique values only.
```py
query_op = {'AND': {'id': '123'}}
test_set = set(['AND', 'OR'])

print(set(query_op.keys()).intersection(test_set))
print(bool(set(query_op.keys()).intersection(test_set)))

# Retrieve an item in set
 all_ids = set(list(range(1, 5)))
order_ids = set(
    [item['orderId'] for item in current_portfolios]
)
del_id = next(iter(all_ids.difference(order_ids)))
```

### Tuples
Same as lists but immutable. Can be destructured. Accessed by []. When function returns multiple values, the result is a tuple.

```python
metallica = ('ride', 1984, ' metallica')
title, year, artist = metallica
print(title)
```

### Dictionaries
When converting Dictionaries to JSON, it doesn't respect order if use OrderedDict() and sorts key alphabetically. Best to use a list of dictionaries.
```python
ordered_dict = OrderedDict()

fruit = {'pear': 'green', 'apple': 'red'}
fruit_keys = list(fruit.keys())   # .keys(), .values(), .items()
veg = {}

fruit['pear']
fruit_keys[1]                 # 'apple'
fruit['orange'] = 'orange'    # either add or replace value
del fruit['pear]              # sane as fruit.pop('pear)
fruit.clear()

x = tuple(fruit.items())          # convert to tuples

veg.update(fruit)
x = fruit.copy()

if all(value is None for value in fruit.values()):
  print('dict is empty')


# to print an array of keys and values in a tuple 
car = {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964
}

x = car.items()   # dict_items([('brand', 'Ford'), ('model', 'Mustang'), ('year', 1964)])


# To test for keys
if 'some_key' in dict:  # cannot use hasattr() method
    return
```

### Subscriptable
Subscriptable objects are objects with a __getitem__ method such as lists, dictionaries and tuples. Class methods are not subscriptable; instead, add another function that returns the method using inspect library.
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

### Inspect
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




