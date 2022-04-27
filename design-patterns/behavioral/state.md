### State

Intent is to allow an object to alter its behavior when its internal state changes. The object will appear to change its class.

### Motivation

For example, a TCP class connection object that receives requests from other objects and responds differently depending on its current state (established, listening, closed). Reduces the need of many conditional statements.

Instead of storing a value in an attribute, and then using conditional statements within object's method to produce different output, a subclass is assigned as a handle instead.

### Applicability

- Use when an object's behavior depends on its state, and must change its behavior at run-time depending on its state.
- Operations have large, multipart conditional statements that depend on object's state (state usually represented by one or more enumerated constants). Often, several operations will contain this same conditional structure. State pattern puts each branch of conditional in a separate class.

### Participants

#### Context

- Defines the interface of interest to clients.
- Maintains an instance of a ConcreteState subclass that defines the current state.

#### State

- Defines an interface for encapsulating the behavior associated with a particular state of the Context.

#### ConcreteState subclasses

- Each subclass implements a behavior associated with a state of the Context.

### Collaborations

- Context delegates state-specific requests to the current ConcreteState object.
- Context may pass itself as an argument to the State object handling the request (allows State object access the context if necessary).
- Context is primary interface for clients.
- Either Context or ConcreteState subclasses can decide which state succeeds another and under what circumstances.

### Consequences

#### Localizes state-specific behavior and partitions behavior for different states

State pattern puts all behavior associated with a particular state into one object. Like long procedures, large conditional statements are undesirable, monolithic and make code less explicit, which makes them difficult to modify and extend. State pattern offers a better way to structure state-specific code. Logic that determines state transitions doesn't reside in monolithic if or switch statements but instead is partitioned between State subclasses.

#### Makes state transitions explicit

When an object defines its current state solely in terms of internal values, its state transitions have no explicit representation; introducing separate objects for different states mkaes the transitions more explicit.

#### State objects can be shared

If State objects have no instance variables, the state they represent is encoded entirely in their type and hence, contexts can share a State object. When states are shared this way, they are essentially flyweights with no intrinsic state, only behavior.

### Example

```py
from __future__ import annotations
from abc import ABC, abstractmethod


class Context:
    "Object whose behavior will change"
    _state = None

    def __init__(self, state):
        self.transition_to(state)

    def transition_to(self, state):
        "Allows changing the State object at runtime"
        self._state = state
        self._state.context = self

    "The Context delegates part of its behavior to the current State object"

    def request1(self):
        self._state.handle1()

    def request2(self):
        self._state.handle2()


class State(ABC):
    """
    The base State class declares methods that all Concrete State should
    implement and also provides a backreference to the Context object,
    associated with the State. This backreference can be used by States to
    transition the Context to another State.
    """

    @property
    def context(self):
        return self._context

    @context.setter
    def context(self, context):
        self._context = context     # backreference to Context object

    @abstractmethod
    def handle1(self):
        pass

    @abstractmethod
    def handle2(self):
        pass


"Concrete States implement various behaviors, associated with a state of the Context."

class ConcreteStateA(State):
    def handle1(self):
        print("ConcreteStateA handles request1.")
        print("ConcreteStateA wants to change the state of the context.")
        self.context.transition_to(ConcreteStateB())

    def handle2(self):
        print("ConcreteStateA handles request2.")


class ConcreteStateB(State):
    def handle1(self):
        print("ConcreteStateB handles request1.")

    def handle2(self):
        print("ConcreteStateB handles request2.")
        print("ConcreteStateB wants to change the state of the context.")
        self.context.transition_to(ConcreteStateA())


if __name__ == "__main__":
    context = Context(ConcreteStateA())
    context.request1()
    context.request2()
```
