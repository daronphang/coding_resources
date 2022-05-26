## Built-in Functions

https://docs.python.org/3/library/functions.html

```
abs()
any()
ascii()
bin()
bool()
bytes()
callable()        Checks if an object is callable i.e. allows to use parenthesis (); if object passed, appears to be callable but actual call to object may fail
dict()
dir()             Without args, return list of names in current local scope; with args, return list of valid attributes for object
enmuerate()       Adds counter to an iterable and returns the object
filter()          Takes in a function and iterable
float()
getattr()         Returns value of named attribute of object
len()
list()
map()             Executes a specified function for each item in an iterable
max()
min()
object()
property()        Can be used as decorator in Classes; has getter, setter and deleter methods
range()
round()
reduce()          Useful if need apply a function to an iterable and reduce it to a single cumulative value i.e. sum
set()
setattr()         Args are an object, a string and value
slice()
sorted()
sum()
super()
tuple()
type()
zip()             Combines tuples and returns an iterator of tuples where first item is paired with the other tuple
```

### Dir

```py
# if object has method __dir__(), it will be called and must return list of attributes
class Shape:
  def __dir__(self):
    return ['area', 'perimeter', ' location']

s = Shape()
dir(s)  # ['area', 'location', 'perimeter']
```

### Property

```py
class C:
    def __init__(self):
        self._x = None

    @property
    def x(self):
        """I'm the 'x' property."""
        return self._x

    @x.setter
    def x(self, value):
        self._x = value

    @x.deleter
    def x(self):
        del self._x
```

### Reduce

```py
from functools import reduce

list = [1, 3, 5, 6, 2]
print(reduce(lambda a, b: a + b, list))
```

### Filter

```py
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

def check_even(number):
    if number % 2 == 0:
          return True
    return False

even_numbers_iterator = filter(check_even, numbers)
```

### Map

```py
def myfunc(n):
  return len(n)

x = map(myfunc, ['apple', 'banana'])
```

```py
# mapping dict
def highcharts_formatter(KVtuple):
  return {
      "name": KVtuple[0],
      "data": KVtuple[1]
  }
 
partition_data = list(map(ToolHealthTask.highcharts_formatter, partitions_hash.items()))
```

### Zip

```py
# For zip, if one tuple contains more items, they are ignored
list = [1,2,3, 4]
str = ['a','b','c']

result = zip(list, str)     # {(1, 'a'), (2, 'b'), (3, 'c')}
```

### Callable

```py
# Objects that are callable is an instance of class with __call__ method
def Geek():
    return 5

let = Geek
num = 5 * 5

print(callable(let))  # True
print(callable(num))  # False
```

### Enumerate

```python
grocery = ['bread', 'milk', 'butter']
egrocery = enumerate(grocery, start=0)   # [(0, 'bread'), (1, 'milk'), (2, 'butter')]

for count, item in egrocery:
    print(item)
```

### Nested Arguments

```python
first = ['a', 'b', 'c']
second = ['d', 'e', 'f']
third = ['g', 'h', 'i']

for count, (one,two,three) in enumerate(zip(first,second,third)):
    print(count, one, two, three)

# 0 a d g
# 1 b e h
# 2 c f i
```

### Functional Programming

Important concepts:

1. Recursion: Technique in which functions call themselves (directly/indirectly) in order to loop.
2. Pure Functions: Have no side effects i.e. do not update or modify global variable, object or data structure
3. Higher-order Functions: Functions that take functions as arguments or return functions.
