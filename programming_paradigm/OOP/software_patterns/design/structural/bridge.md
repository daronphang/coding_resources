### Bridge (Handle/Body)

Decouples an abstraction from its implementation so that the two can vary independently. Considered one of the best methods to organize class hierarchy and avoiding complexity explosion whereby the number of class combinations exponentially increases i.e. different shapes of different colors. Favors composition over inheritance.

When an abstraction can have one of several possible implementations, the usual way to accomodate them is to use inheritance. However, this approach isn't always flexible enough as inheritance binds an implementation to the abstraction permanently, which makes it difficult to modify, extend and reuse abstractions and implementations independently. Bridge pattern addresses these problems by putting abstraction and implementation of a class in separate class hierarchies.

Useful when dealing with cross-platform apps, supporting multiple types of database servers or working with several API providers (cloud platforms, social networks, etc).

### Applicability

- When you want to avoid a permanent binding between an abstraction and its implementation i.e. switching implementation at run-time.
- When both abstractions and implementations should be extensible by subclassing.
- When changes in implementation of an abstraction should have no impact on clients i.e. code should not be recompiled.
- When you want to share an implementation among multiple objects.

### Participants

#### Abstraction

- Defines the abstraction interface.
- Maintains a reference to an object of second hierarchy of type Implementor.

#### RefinedAbstraction

- Extends the interface defined by Abstraction.

#### Implementor

- Defines the interface for implementation classes.
- Interface does not have to correspond exactly to Abstraction's interface; typically Implementor interface provides primitive operations while Abstraction defines higher-level operations.

#### ConcreteImplementor

- Implements the Implementor interface and deifnes its concrete implementation.

### Consequences

#### Decoupling interface and implementation

An implementation is not bound permanently to an interface and can be configured at run-time. Decoupling also eliminates compile-time dependencies on the implementation.

#### Improved extensibility

Can extend Abstraction and Implementor hierarchies independently.

#### Hiding implementation details from clients

Can shield clients from implementation details like sharing of implementor objects and accompanying reference count mechanism.

### Implementation

#### Only one implementor

There's one-to-one relationship between Abstraction and Implementor.

#### Creating the right implementor object

If Abstraction knows about all ConcreteImplementor classes, then it can instantiate one of them in its constructor. Another approach is to choose a default implementation initially and change it later according to usage.

#### Using multiple inheritance

Can use multiple inheritance to combine an interface with its implementation. For example, a class can inherit publicly from Abstraction and privately from a ConcreteImplementor. However, can't implement a true Bridge with multiple inheritance for static language.

### Example

Implementing an Airplane that can be miltiary/commercial and passenger/cargo. Can create a bridge between classes (Airplane and Carrier implementation).

```py
from abc import ABC, abstractmethod

# Passenger & Cargo Carriers
class Carrier(ABC):
    @abstractmethod
    def carry_military(self, items):
        pass

    @abstractmethod
    def carry_commercial(self, items):
        pass

class Cargo(Carrier):
    def carry_military(self, items):
        print("The plane carries ", items," military cargo goods")

    def carry_commercial(self, items):
        print("The plane carries ", items," commercial cargo goods")

class Passenger(Carrier):
    def carry_military(self, passengers):
        print("The plane carries ",  passengers , " military passengers")

    def carry_commercial(self, passengers):
        print("The plane carries ",  passengers , " commercial passengers")

# Military & Commercial Planes
class Plane:
    def __init__(self, Carrier):
        self.carrier = Carrier

    def display_description(self):
        pass

    def add_objects(self):
        pass

class Commercial(Plane):
    def __init__(self, Carrier, objects):
        super().__init__(Carrier)
        self.objects = objects

    def display_description(self):
        self.carrier.carry_commercial(self.objects)

    def add_objects(self, new_objects):
        self.objects += new_objects

class Military(Plane):
    def __init__(self, Carrier, objects):
        super().__init__(Carrier)
        self.objects = objects

    def display_description(self):
        self.carrier.carry_military(self.objects)

    def add_objects(self, new_objects):
        self.objects += new_objects


cargo = Cargo()
passenger = Passenger()

military1 = Military(cargo , 100)
military2 = Military(passenger , 250)
```

```py
from __future__ import annotations
from abc import ABC, abstractmethod


class Abstraction:
    """
    The Abstraction defines the interface for the "control" part of the two
    class hierarchies. It maintains a reference to an object of the
    Implementation hierarchy and delegates all of the real work to this object.
    """

    def __init__(self, implementation: Implementation) -> None:
        self.implementation = implementation

    def operation(self) -> str:
        return (f"Abstraction: Base operation with:\n"
                f"{self.implementation.operation_implementation()}")


class ExtendedAbstraction(Abstraction):
    """
    You can extend the Abstraction without changing the Implementation classes.
    """

    def operation(self) -> str:
        return (f"ExtendedAbstraction: Extended operation with:\n"
                f"{self.implementation.operation_implementation()}")


class Implementation(ABC):
    """
    The Implementation defines the interface for all implementation classes. It
    doesn't have to match the Abstraction's interface. In fact, the two
    interfaces can be entirely different. Typically the Implementation interface
    provides only primitive operations, while the Abstraction defines higher-
    level operations based on those primitives.
    """

    @abstractmethod
    def operation_implementation(self) -> str:
        pass


"""
Each Concrete Implementation corresponds to a specific platform and implements
the Implementation interface using that platform's API.
"""


class ConcreteImplementationA(Implementation):
    def operation_implementation(self) -> str:
        return "ConcreteImplementationA: Here's the result on the platform A."


class ConcreteImplementationB(Implementation):
    def operation_implementation(self) -> str:
        return "ConcreteImplementationB: Here's the result on the platform B."


def client_code(abstraction: Abstraction) -> None:
    """
    Except for the initialization phase, where an Abstraction object gets linked
    with a specific Implementation object, the client code should only depend on
    the Abstraction class. This way the client code can support any abstraction-
    implementation combination.
    """

    # ...

    print(abstraction.operation(), end="")

    # ...


if __name__ == "__main__":
    """
    The client code should be able to work with any pre-configured abstraction-
    implementation combination.
    """

    implementation = ConcreteImplementationA()
    abstraction = Abstraction(implementation)
    client_code(abstraction)

    print("\n")

    implementation = ConcreteImplementationB()
    abstraction = ExtendedAbstraction(implementation)
    client_code(abstraction)
```
