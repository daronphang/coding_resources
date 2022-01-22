### Memento (Token)

Intent is to capture and externalize an object's internal state so that the object can be restored to this state later without violating encapsulation.

### Motivation

Sometimes it is necessary to record the internal state of an object such as when implementing checkpoints and undo mechanisms that users back out of tentative operations or recover from errors. You must save state information somewhere so taht you can restore objects to their previous states. However, objects normally encapsulate some/all of their state and hence, making it inaccessible to other objects and impossible to save externally. Exposing this state would violate encapsulation, which can compromise the application's reliability and extensibility.

A Memento is an object that stores a snapshot of the internal state of another object (Memento's originator). The undo mechanism will request a memento from the orginator when it needs to checkpoint the originator's state. Only the originator can store and retrieve information from the memento.

### Applicability

Use the Memento pattern when:

- A snapshot of an object's state must be saved so taht it can be restored to that state later.
- A direct interface to obtaining the state would expose implementation details and break the object's encapsulation.

### Participants

#### Memento

- Stores internal state of the Originator's object.
- Protects against access by objects other than the originator; Mementos have effectively two interfaces.

#### Originator

- Creates a memento containing a snapshot of its current internal state.
- Use the memento to restore its internal state.

#### Caretaker

- Is responsible for the memento's safekeeping.
- Never operates on or examines the contents of a memento.
- Provides a narrow interface to the mementos.

### Collaborations

- A caretaker requests a memento from an originator, holds it for a time, and passes it back to the originator.
- Sometimes the caretaker won't pass the memento back to the originator because the originator might never need to revert to an earlier state.
- Mementos are passive; only the originator that created a memento will assign or retrieve its state.

### Consequences

#### Preserving encapsulation boundaries

Memento avoids exposing information that only an originator should manage but that must be stored nevertheless outside the originator.

#### Simplifies Originator

Originator keeps the versions of internal state that clients have requested and hence, put all storage management burden on Originator.

#### Using mementos might be expensive

Might incur considerable overhead if Originator must copy large amounts of information to store, of if clients create and return mementos to the originator often enough.

#### Hidden costs in caring for mementos

Caretaker is responsible for deleting the mementos it cares for. However, the caretaker has no idea how much state is in the memento.

### Example

```py
from __future__ import annotations
from abc import ABC, abstractmethod
from datetime import datetime
from random import sample
from string import ascii_letters, digits


class Originator:
    "Originator holds some important state that may change over time"

    _state = None

    def __init__(self, state):
        self._state = state

    def do_something(self):
        "Originator's business may affect its internal state. Client should backup state before launching methods of business logic via save() method"
        self._state = self._generate_random_string(30)

    def generate_random_string(self, length):
        return "".join(['a', 'b'])

    def save(self):
        "Saves current state inside memento"
        return ConcreteMemento(self._state)

    def restore(self, memento):
        self._state = memento.get_state()


class Memento(ABC):
    @abstractmethod
    def get_name(self):
        pass

    @abstractmethod
    def get_date(self):
        pass


class ConcreteMemento(Memento):
    def __init__(self, state):
        self._state = state
        self._date = str(datetime.now())[:19]

    # omitting setters and getters for demonstration purposes
    def get_state(self):
        return self._state

    def get_date(self):
        return self._date


class Caretaker:
    def __init__(self, originator):
        self._mementos = []
        self._originator = originator

    def backup(self):
        # Stores a new memento of originator's current state
        self._mementos.append(self._originator.save())

    def undo(self):
        if not len(self._mementos):
            return
        memento = self._mementos.pop()
        try:
            self._originator.restore(memento)
        except Exception:
            self.undo()


    def show_history(self):
        for memento in self._mementos:
            print(memento.get_name())


if __name__ == "__main__":
    originator = Originator('hello world')
    caretaker = Caretaker(originator)

    caretaker.backup()
    originator.do_something()

    caretaker.undo()
```
