## Description:
Allows cloning of simple and complex objects without coupling to their specific classes. Helps to hide complexity of instances created by the class. The newly created object may have some changes in properties if required. Aims to reduce the number of classes used for an app. Allows to copy existing objects independent of concrete implementation of their classes. Object is created by copying a prototypical instance during run-time. Useful when object creation is an expensive task.

## Solution:
1) Create Prototype interface that declares the cloning methods. 
2) Create Concrete Prototype class that implements the cloning method.
3) Client can produce a copy of any object that follows prototype interface.

## Advantages:
- Lesser number of subclasses.
- Provides varying values and structure to new objects.
- Can produce complex objects more conveniently.
- Can get rid of repeated initialization code.

## Disadvantages:
- Overkill of resources for project with few objects.
- Cloning complex objects that have circular references can be tricky.

```python
from abc import ABCMeta, abstractmethod

class IProtoType(metaclass=ABCMeta):
    "interface with clone method"
    @staticmethod
    @abstractmethod
    def clone():
        """The clone, deep or shallow.
        It is up to you how you want to implement
        the details in your concrete class"""

class MyClass(IProtoType):
    "A Concrete Class"

    def __init__(self, field):
        self.field = field  # any value of any type

    def clone(self):
        " This clone method uses a shallow copy technique "
        return type(self)(
            self.field  # a shallow copy is returned
            # self.field.copy() # this is also a shallow copy, but has
            # also shallow copied the first level of the field. So it
            # is essentially a shallow copy but 2 levels deep. To
            # recursively deep copy collections containing inner
            # collections,
            # eg lists of lists,
            # Use https://docs.python.org/3/library/copy.html instead.
            # See example below.
        )

    def __str__(self):
        return f"{id(self)}\tfield={self.field}\ttype={type(self.field)}"

# The Client
OBJECT1 = MyClass([1, 2, 3, 4])  # Create the object containing a list

OBJECT2 = OBJECT1.clone()  # Clone

# Change the value of one of the list elements in OBJECT2,
OBJECT2.field[1] = 101
```
