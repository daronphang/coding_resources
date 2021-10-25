## Sequence Types & Destructuring:
An ordered list of items. String, list, tuple, range, bytes and bytearray. Dictionaries are ordered from 3.6 onwards.

```py
# destructuring dict 
from operator import itemgetter

params = {'a': 1, 'b': 2}
a, b = itemgetter('a', 'b')(params)
```

## Type Conversions:
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

## Operations:
```python
a/b     # float
a//b    # integer
a % b   # remainder after integer division

sevens = range(7, 1000, 7)      // divisble by 7
```

## strings and Slices:
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

## String Replacement:
```python
print('my age is {0}, born in {1}'.format('12', '1993')
print('pi is approx {0:12}'.format(22/7))   # defualt for 15 decimals
{0:12f}   # default for 6 decimals
{0:12.50f}    # precision of 50 i.e. 50 points after decimal point

name = 'john'
age = 23
print(f'my name is {name}, age {age}')

print(x,y, sep='\n')
```

## True vs False:
False object are None, False, 0, 0.0, 0j, '', (), {}, range(0). Use any() or all() to check for truth in lists.

## Lists:
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

vowels = ['a', 'e', 'i', 'o', 'u']
vowels_iter = iter(vowels)

print(next(vowels_iter))    # 'a'
print(next(vowels_iter))    # 'e'

```

## Tuples:
Same as lists but immutable. Can be destructured. Accessed by []. When function returns multiple values, the result is a tuple.

```python
metallica = ('ride', 1984, ' metallica')
title, year, artist = metallica
print(title)
```

## Dictionaries:
```python
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

```

## Functional Programming:
Important concepts:
1) Recursion: Technique in which functions call themselves (directly/indirectly) in order to loop.
2) Pure Functions: Have no side effects i.e. do not update or modify global variable, object or data structure
3) Higher-order Functions: Functions that take functions as arguments or return functions.

## Built-in Functions:
```
zip         Combines tuples and returns an iterator of tuples where first item is paired with the other tuple
filter      Takes in a function and iterable
reduce      Useful if need apply a function to an iterable and reduce it to a single cumulative value i.e. sum
map         Executes a specified function for each item in an iterable

callable    Checks if an object is callable i.e. allows to use parenthesis (); if object passed, appears to be callable but actual call to object may fail
```

```python
from functools import reduce

list = [1, 3, 5, 6, 2]
print(reduce(lambda a, b: a + b, list))


# filter
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

def check_even(number):
    if number % 2 == 0:
          return True  
    return False

even_numbers_iterator = filter(check_even, numbers)


# map
def myfunc(n):
  return len(n)

x = map(myfunc, ['apple', 'banana']


# For zip, if one tuple contains more items, they are ignored
list = [1,2,3, 4]
str = ['a','b','c']

result = zip(list, str)     # {(1, 'a'), (2, 'b'), (3, 'c')}

# callable
# Objects that are callable is an instance of class with __call__ method
def Geek():
    return 5

let = Geek
num = 5 * 5

print(callable(let))  # True
print(callable(num))  # False
```





