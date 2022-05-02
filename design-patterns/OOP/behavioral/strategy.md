### Strategy (Policy)

Intent is to define a family of algorithms, encapsulate each one, and make them interchangeable.

### Motivation

Many algorithms exist for breaking a stream of text into lines. Hard-wiring all such algorithms into the classes that require them isn't desirable as it will be appropriate at different times and difficult to add new algorithms and vary existing ones.

Strategy pattern suggests that you take a class that does something specific in a lot of different ways and extract all of these algorithms into separate classes called strategies.

Original class (context) must have a field for storing a reference to one of the strategies. Context delegates the work to a linked strategy object instead of executing it on its own. Context works with all strategies through the same generic interface, and only exposes a single method for triggering the algorithm encapsulated within the selected strategy i.e. context is independent of concrete strategies.

### Applicability

Use when:

- Many related classes differ only in their behavior.
- You need different variants of an algorithm.
- An algorithm uses data that clients shouldn't know about.
- A class defines many behaviors and appear as multiple conditional statements in operations.

### Participants

#### Strategy

- Declares an interface common to all supported algorithms.

#### ConcreteStrategy

- Implements the algorithm using the strategy interface.

#### Context

- Is configured with a ConcreteStrategy object.
- Maintains a reference to a Strategy object.
- May define an interface that lets Strategy access its data.

### Collaborations

Strategy and Context interact to implement the chosen algorithm. A context may pass all data required by the algorithm to the strategy when the algorithm is called. Alternatively, the context can pass itself as an argument to Strategy operations.

A context forwards requests from its clients. Clients usually create and pass a ConcreteStrategy object to the context.

### Consequences

#### Families of related algorithms

Hierarchies of Strategy classes define a family of algorithms or behaviors for contexts to reuse.

#### An alternative to subclassing

Although inheritance offers a way to support algorithms or behaviors, it hard-wires behavior into Context. Strategy classes lets you vary the algorithm independently of its context, making it easier to switch, understand or extend.

#### Eliminates conditional statements

When different behaviors are lumped into one class, it's hard to avoid using conditional statements for selecting desired behavior. Encapsulating the behavior in separate Strategy classes eliminates these conditional statements.

#### Clients must be aware of different Strategies

Pattern has a potential drawback in that a client must understand how Strategies differ before it can select the appropriate one.

#### Communication overhead between Strategy and Context

Strategy interface is shared by all ConcreteStrategy classes whether the algorithms they implement are trivial or complex. Hence, it is likely that some ConcreteStrategies won't use all the information passed to them through this interface.

#### Increased number of objects

Strategies increase the number of objects in an application. Can reduce this overhead by implementing strategies as stateless objects that contexts can share.

### Example

```py
from __future__ import annotations
from abc import ABC, abstractmethod
from typing import List


class Context():
    """
    The Context defines the interface of interest to clients.
    """

    def __init__(self, strategy: Strategy) -> None:
        """
        Usually, the Context accepts a strategy through the constructor, but
        also provides a setter to change it at runtime.
        """

        self._strategy = strategy

    @property
    def strategy(self) -> Strategy:
        """
        The Context maintains a reference to one of the Strategy objects. The
        Context does not know the concrete class of a strategy. It should work
        with all strategies via the Strategy interface.
        """

        return self._strategy

    @strategy.setter
    def strategy(self, strategy: Strategy) -> None:
        """
        Usually, the Context allows replacing a Strategy object at runtime.
        """

        self._strategy = strategy

    def do_some_business_logic(self) -> None:
        """
        The Context delegates some work to the Strategy object instead of
        implementing multiple versions of the algorithm on its own.
        """

        # ...

        print("Context: Sorting data using the strategy (not sure how it'll do it)")
        result = self._strategy.do_algorithm(["a", "b", "c", "d", "e"])
        print(",".join(result))

        # ...


class Strategy(ABC):
    """
    The Strategy interface declares operations common to all supported versions
    of some algorithm.

    The Context uses this interface to call the algorithm defined by Concrete
    Strategies.
    """

    @abstractmethod
    def do_algorithm(self, data: List):
        pass


"""
Concrete Strategies implement the algorithm while following the base Strategy
interface. The interface makes them interchangeable in the Context.
"""


class ConcreteStrategyA(Strategy):
    def do_algorithm(self, data: List) -> List:
        return sorted(data)


class ConcreteStrategyB(Strategy):
    def do_algorithm(self, data: List) -> List:
        return reversed(sorted(data))


if __name__ == "__main__":
    # The client code picks a concrete strategy and passes it to the context.
    # The client should be aware of the differences between strategies in order
    # to make the right choice.

    context = Context(ConcreteStrategyA())
    print("Client: Strategy is set to normal sorting.")
    context.do_some_business_logic()
    print()

    print("Client: Strategy is set to reverse sorting.")
    context.strategy = ConcreteStrategyB()
    context.do_some_business_logic()
```
