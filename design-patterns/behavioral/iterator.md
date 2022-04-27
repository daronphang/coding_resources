### Iterator (Cursor)

Intent is to provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.

### Motivation

An aggregate object such as a list should give you a way to access its elements without exposing its internal structure. Moreover, might want to traverse the list in different ways but do not want to bloat the List interface with operations for different traversals. Iterator pattern is enacted in Python's syntax i.e. for operator.

Key idea in this pattern is to take responsibility for access and traversal out of the list object and put it into an iterator object. The iterator class defines an interface for accessing the list's elements. An iterator object is responsible for keeping track of the current element.

List and iterator are coupled, and client must know that it is a list that's traversed as opposed to some other aggregate structure.

### Applicability

Use the Iterator pattern:

- To access an aggregate object's contents without exposing its internal representation.
- To support multiple traversals of aggregate objects.
- To provide a uniform interface for traversing different aggregate structures i.e. support polymorphic iteration.

### Participants

#### Iterator

- Defines an interface for accessing and traversing elements.

#### ConcreteIterator

- Implements the Iterator interface.
- Keeps track of current position in the traversal of aggregate.

#### Aggregate

- Defines an interface for creating an Iterator object.

#### ConcreteAggregate

- Implements the Iterator creation interface to return an instance of the proper ConcreteIterator.

### Collaborations

ConcreteIterator keeps track of the current object in the aggregate and can compute the succeeding object in the traversal.

### Consequences

#### Supports variations in the traversal of an aggregate

Complex aggregates may be traversed in many ways.

#### Iterators simplify the Aggregate interface

Iterator's traversal interface obviates the need for a similar interface in Aggregate.

#### More than one traversal can be pending on an aggregate

An iterator keeps track of its own traversal state and hence, can have more than one traversal in progress at once.

### Example

```py
from __future__ import annotations
from collections.abc import Iterable, Iterator
from typing import Any, List


class AlphabeticalOrderIterator(Iterator):
    "Concrete iterators implement various traversal algo"
    _position: int = None
    _reverse: bool = False

    def __init__(self, collection, reverse):
        self._collection = collection
        self._reverse = reverse
        self._position = -1 if reverse else 0

    def __next__(self):
        "next() must return next item in sequence"
        try:
            value = self._collection[self._position]
            self._position += -1 if self._reverse else 1
        except IndexError:
            raise StopIteration()
        return value


class WordsCollection(Iterable):
    def __init__(self, collection):
        self._collection = collection

    def __iter__(self):
        return AlphabeticalOrderIterator(self._collection)

    def get_reverse_iterator(self):
        return AlphabeticalOrderIterator(self._collection, True)

    def add_item(self, item):
        self._collection.append(item)
```
