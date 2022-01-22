### Observer

Intent is to define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

### Motivation

Common side-effect of partitioning a system into a collection of cooperating classes is the need to maintain consistency between related objects. For instance, many graphical user interface toolkits separate presentational aspects of user interface (graphs, charts, tables) from application data. When user changes information, graphs/charts reflect the changes immediately.

### Applicability

- When an abstraction has two aspects, one dependent on the other.
- When a change to one object requires changing others, and you don't know how many objects need to be changed.
- When an object should be able to notify other objects without making assumptions about who these objects are (loosely coupled).

### Participants

#### Subject

- Knows its observers; any number of Observer objects may observe a subject.
- Provides an interface for attaching and detaching Observer objects.
- All Observers must implement the same interface and that the Subject communicates with them only via that interface.
- Interface should declare the notification method along with a set of parameters that the subject/publisher can use to pass some data along with notification.

#### Observer

- Defines an updating interface for objects that should be notified of changes in a subject.

#### ConcreteSubject

- Stores state of interest to ConcreteObserver objects.
- Sends a notification to its observers when its state changes.

#### ConcreteObserver

- Maintains a reference to a ConcreteSubject object.
- Stores state that should stay consistent with the subject's.
- Implements the Observer updating interface to keep its state consistent with subject's.

### Collaborations

- ConcreteSubject notifies its observers whenever a change occurs that could make its observers' state inconsistent with its own.
- After being informed of a change, ConcreteObserver object may query the subject for information.

### Consequences

#### Abstract coupling between Subject and Observer

All a subject knows is that it has a list of observers, each conforming to the simple interface of the abstract Observer class. Subject doesn't know concrete class of any observer. Hence, both are loosely coupled.

#### Support for broadcast communication

Notification that a subject sends need not specify its receiver i.e. broadcast automatically to all interested objects that subscribed to it.

#### Unexpected updates

Observers can be blind to the ultimate cost of changing the subject. An operation on the subject may cause a cascade of updates to observers and their dependent objects.

### Example

```py
from __future__ import annotations
from abc import ABC, abstractmethod
from random import randrange
from typing import List


class Subject(ABC):
    @abstractmethod
    def attach(self, observer):
        pass

    @abstractmethod
    def detach(self, observer):
        pass

    @abstractmethod
    def notify(self):
        pass


class ConcreteSubject(Subject):
    "Owns some important state and notifies observers when state changes"
    _state = None
    _observers: List[Observer] = []

    def attach(self, observer):
        self._observers.append(observer)

    def detach(self, observer):
        self._observers.remove(observer)

    def notify(self):
        "Triggers an update in each subscriber"
        for observer in self._observers:
            observer.update(self)

    def some_business_logic(self):
        "Subjects commonly hold some business logic that triggers a notification method whenever something important is about to happen"
        self._state = randrange(0, 10)
        self.notify()


class Observer(ABC):
    @abstractmethod
    def update(self, subject):
        pass


class ConcreteObserverA(Observer):
    def update(self, subject):
        if subject._state < 3:
            print("ObserverA reacted to event")


if __name__ == "__main__":
    subject = ConcreteSubject()

    observer_a = ConcreteObserverA()
    subject.attach(observer_a)

    observer_b = ConcreteObserverB()
    subject.attach(observer_b)

    subject.some_business_logic()
    subject.some_business_logic()

    subject.detach(observer_a)

    subject.some_business_logic()
```

```py
class Subscriber:
    def __init__(self, name):
        self.name = name
    def update(self, message):
        print('{} got message "{}"'.format(self.name, message))

class Publisher:
    def __init__(self):
        self.subscribers = set()
    def register(self, who):
        self.subscribers.add(who)
    def unregister(self, who):
        self.subscribers.discard(who)
    def dispatch(self, message):
        for subscriber in self.subscribers:
            subscriber.update(message)


pub = Publisher()

bob = Subscriber('Bob')
alice = Subscriber('Alice')
john = Subscriber('John')

pub.register(bob)
pub.register(alice)
pub.register(john)

pub.dispatch("It's lunchtime!")

pub.unregister(john)

pub.dispatch("Time for dinner")
```
