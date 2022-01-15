### Prototype

Specify the kinds of objects to create using prototypical instance, and create new objects by copying this prototype (deep copy). Allows cloning of simple and complex objects without coupling to their specific classes. Helps to hide complexity of instances created by the class. The newly created object may have some changes in properties if required. Aims to reduce the number of classes used for an app. Allows to copy existing objects independent of concrete implementation of their classes. Object is created by copying a prototypical instance during run-time. Useful when object creation is an expensive task. Particularly useful with static languages with C++.

### Applicability

- When classes to instantiate are specified at run-time i.e. dynamic loading.
- To avoid building a class hierarchy of factories that parallels the class hierarchy of products.
- When instances of a class can have one of only a few different combinations of state i.e. more convenient to clone a prototype than instantiating class manually each time with the appropriate state.

### Participants

#### Prototype

- Declares an interface for cloning itself.

#### Concrete Prototype

- Implements an operation for cloning itself.

#### Client

- Creates a new object by asking prototype to clone itself.

### Consequences

Has many of the same consequences as Abstract Factory and Builder have including hiding the concrete product classes from client and reducing the number of names clients know about.

#### Adding and removing products at run-time

Prototypes allow you to incorporate new concrete product class into a system simply by registering a prototypical instance with the client which is more flexible than other creational patterns.

#### Specifying new objects by varying values

Effectively defining new kinds of objects by instantiating existing classes and registering the instances as prototypes of client objects. Client can exhibit new behavior by delegating responsibility to the prototype.

#### Specifying new objects by varying structure

Allows building of objects from parts and subparts by adding them as a prototype to the object instance.

#### Reduced subclassing

Prototype patterns lets you clone a prototype instead of asking a factory method to make new object and hence, doesn't require Creator class hierarchy at all.

#### Configuring an application with classes dynamically

An application that wants to create instances of a dynamically loaded class won't be able to reference its constructor statically. Instead, the run-time environment creates an instance of each class automatically when it's loaded, and registers the instance with a prototype manager.

### Implementation

#### Using prototype manager

When the number of prototypes in a system isn't fixed (created/destroyed dynamically), should keep a registry of available prototypes where clients can store and retrieve prototypes from it.

#### Implementing clone operation

Hardest part is to implement the Clone operation correctly, especially with object structures containing circular references. Need to ensure deep copy and not shallow copy.

#### Initializing clones

Some clients may initialize some or all of its internal state to values of their choosing.

### Example

```py
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
