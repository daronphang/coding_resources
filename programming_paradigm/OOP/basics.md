### OOP

Programming paradigm that relies on concept of classes and objects, structuring reusuable pieces of code blueprints (classes) which are used to create individual instances of objects. Classes can share methods and attributes.

### Interfaces

Every operation declared by an object specifies the operation's name, the objects it takes as parameters, and the operation's return value; this is known as the operation's signature. The set of all signatures defined by an object's operations is called the interface. An object's interface characterizes the complete set of requests that can be sent to the object. A type is a name used to denote an interface. An object may have many types, and many objects can share a type.

Objects are known only through their interfaces; there is no way to know anything about an object or to ask it to do anything without going through its interface. Different objects are free to implement requests differently i.e. two objects can have different implementations of identitcal interfaces.

Run-time association of a request to an object and one of its operations is known as **dynamic binding** i.e. issuing a request doesn't commit to a particular implementation until run-time. Also allows to substitute objects that have identical interfaces for each other at run-time; substitutability is known as **polymorphism**. It lets a client object make few assumptions about other objects beyond supporting a particular interface.

### Specifying Object Implementations

Objects are created by instantiating a class. Object created is an instance of the class. New classes can be defined by existing classes using **inheritance**.

An abstract class is one whose main purpose is to define a common interface for its subclasses. An abstract class cannot be instantiated. Classes that aren't abstract are **concrete classes**.

A **mixin** class is a class that's intended to provide an optional interface or functionality to other classes. Similar to abstract class whereby it is not intended to be instantiated. Mixin classes require multiple inheritance i.e. existing class, mixin class, and augmented class (consisting of methods from both existing and mixin).

### Class vs Type

An object's class defines how the object is implemented by defining its internal state and the implementation of its operations. In contrast, an object's type refers to its interface.

### Programming to an Interface, not an Implementation

Should manipulate objects solely in terms of interface defined by abstract classes as it reduces implementation dependencies between subsystems. Don't declare variables to be instances of a particular concrete class but instead, commit to an interface defined by an abstract class.

### Inheritance vs Composition

Class inheritance allows the implementation of one class to be defined in terms of another. For object composition, new functionality is obtained by assembling objects to get more complex functionality. Should favor object composition over class inheritance.

#### Inheritance

- Inheritance is defined statically at compile-time and straightforward to use.
- Easier to modify implementation being reused.
- However, can't change implementation inherited from parent class at run-time.
- Parent classes often define part of subclasses' physical representation i.e. inheritance breaks encapsulation as any changes in parent's implementation will force subclass to change.

#### Composition

- Object composition is defined dynamically at run-time through objects acquiring references to other objects.
- Requires objects to respect each others' interfaces.
- Doesn't break encapsulation as objects are accessed solely through their interfaces.

### Delegation

A way of making composition as powerful for reuse as inheritance. In delegation, a receiving object delegates operations to its delegate:

- Class Rectangle has methods Area().
- Instead of making class Window a subclass of Rectangle, Window reuses Rectangle's behavior by delegating to it i.e. Window has a Rectangle.
- Window must forward requests to its Rectangle instance explicitly.
