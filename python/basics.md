## Sequence Types:
An ordered list of items. String, list, tuple, range, bytes and bytearray. Dictionaries are ordered from 3.6 onwards.

## Type Conversions:
```
int()
float()
str()
tuple()
list()
```

## Operations:
```
a/b     # float
a//b    # integer
a % b   # remainder after integer division

sevens = range(7, 1000, 7)      // divisble by 7
```

## strings and Slices:
```
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
Same as lists but immutable. Can be destructured. Accessed by [].

```
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
```

## Functions:
Zip, filter, reduce, map. Zip combines tuples and returns an iterator of tuples where first item is paired with the other tuple. If one tuple contains more items, they are ignored.

```python
list = [1,2,3, 4]
str = ['a','b','c']

result = zip(list, str)     # {(1, 'a'), (2, 'b'), (3, 'c')}

```

## Super Classes:
For multiple inheritance whereby both classes have same method name, Method Resolution Order (MRO) algorithm comes into play which decides where Python will look for a given method, and which method will be called when there's a conflict. Order is child class, followed by left to right.  

```python
class Mammal(object):
  def __init__(self, mammalName):
    print(mammalName, 'is a warm-blooded animal.')
    
class Dog(Mammal):
  def __init__(self):
    print('Dog has four legs.')
    super().__init__('Dog')
    
d1 = Dog()
```

## Mixin:
Special kind of multiple inheritance. Cannot be instantiated by themselves. Useful when:
- Want to provide alot of optional features for a class.
- Want to use one particular feature in alot of different classes.

```python
from .views import View
from .models import Product, Category, Customer, Order

class SingleObjectMixin(object):
    model = None
    def get_object(self, request):
        if self.model is None:
            raise Exception("Model must be set.")
        return self.model.get(id=request.kwargs.get("id")

class ProductView(SingleObjectMixin, View):
    model = Product

class CategoryView(SingleObjectMixin, View):
    model = Category

class CustomerView(SingleObjectMixin, View):
    model = Customer

class OrderView(SingleObjectMixin, View):
    model = Order
```



