## Built-in Functions:
https://docs.python.org/3/library/functions.html

```
abs()
any()
ascii()
bin()
bool()
bytes()
callable()
dict()
dir()             Without args, return list of names in current local scope; with args, return list of valid attributes for object
enmuerate()
filter()
float()
getattr()         Returns value of named attribute of object
len()
list()
map()
max()
min()
object()
property()        Can be used as decorator in Classes; has getter, setter and deleter methods
range()
round()
set()
setattr()         Args are an object, a string and value
slice()
sorted()
sum()
super()
tuple()
type()
zip()
```

```py
# dir
# if object has method __dir__(), it will be called and must return list of attributes
class Shape:
  def __dir__(self):
    return ['area', 'perimeter', ' location']

s = Shape()
dir(s)  # ['area', 'location', 'perimeter']

# property
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
