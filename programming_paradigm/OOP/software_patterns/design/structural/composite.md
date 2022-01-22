### Composite

Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects and compositions of objects uniformly i.e. a group of objects is treated the same way as a single instance of the same type of objects. Composite pattern describes how to use recursive composition so that clients don't have to make distinction. An example would be a drawing editor allowing users to build complex diagrams out of simple components i.e. lines, rectangle and text to form a picture.

Key to Composite pattern is an abstract class that represents both primitives and their containers. Useful whenever we have tree-like data structure i.e. file system, stacked resources, organization.

### Applicability

- When you want to represent part-whole hierarchies of objects.
- When you want clients to be able to ignore the difference between compositions of objects and individual objects i.e. clients will treat all objects in composite structure uniformly.

### Participants

#### Component

- Declares the interface for objects in the composition.
- Implements default behavior for interface common to all classes.
- Declares an interface for accessing and managing its child components.

#### Leaf

- Represents leaf objects in the composition (has no children).
- Defines behavior for primitive objects in the composition.

#### Composite

- Defines behavior for components having children.
- Stores child components.
- Implements child-related operations in the Component interface.

#### Client

- Manipulates objects in composition through the Component interface.

### Collaborations

Clients use Component class interface to interact with objects in the composite structure. If the recipient is a Leaf, then the request is handled directly. If the recipient is a Composite, then it usually forwards requests to its child components, possibly performing additional operations before and/or after forwarding.

### Consequences

#### Defines class hierarchies consisting of primitive objects and composite objects

Primitive objects can be composed into more complex objects, which in turn can be composed, recursively. Wherever client code expects a primitive object, it can also take a composite object.

#### Makes client simple

Clients can treat composite structures and individual objects uniformly. Clients normally do not know whether they are dealing with a Leaf or a Composite component.

#### Makes it easier to add new kinds of components

Newly defined Composite or Leaf subclasses work automatically with existing structures and client code.

#### Can make design overly general

Makes it harder to restrict components of a Composite i.e. sometimes want to have a composite to have certain components. Have to use run-time checks instead.

### Example

```py
from __future__ import annotations
from abc import ABC, abstractmethod
from typing import List

class Component(ABC):
    "Base component class declares common operations for simple/complex objects"
    @property
    def parent(self):
        return self._parent

    @parent.setter
    def parent(self, parent: Component):
        "Can optionally declare an interface for setting/accessing a parent component in tree structure"
        self._parent = parent

    "Defining child-management operations; methods will be empty for leaf-level components"
    def add(self, component):
        pass

    def remove(self, component):
        pass

    def is_composite(self):
        "Check if component can bear children"
        return False

    @abstractmethod
    def operation(self):
        "base component can implement default behavior or leave it to concrete class"
        pass


class Leaf(Component):
    "Represents end objects of a composition and can't have any children"
    def operation(self):
        return "Leaf"


class Composite(Component):
    "Represents complex components that may have children"
    def __init__(self):
        self._children = []

    def add(self, component):
        self._children.append(component)
        component.parent = self

    def remove(self, component):
        self._children.remove(component)
        component.parent = None     # setting child component.parent to None

    def is_composite(self):
        return True

    def operation(self):
        "Executes its primary logic and traverses recursively through all children"
        results = []
        for child in self._children:
            results.append(child.operation())
        return results

simple = Leaf()
tree = Composite()
branch1 = Composite()
branch1.add(Leaf())

tree.add(branch1)
```
