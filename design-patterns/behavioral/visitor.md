### Visitor

Intent is to represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates (touching the base class). Allows us to add new features to an existing class hierarchy dynamically without changing it. Visitor is effectively a separate class hierarchy to virtualize the operations performed upon the primary base class.

### Motivation

When designing the objects in your application that may be structured in a hierarchical fashion, can allow them to implement a Visitor interface. Useful when want to analyze or reproduce an alternative object hierarchy without implementing extra code in object classes.

When an element accepts the visitor, it sends a request to the visitor that encodes the element's class. It also includes the element as an argument. The visitor will then execute the operation for that element.

### Applicability

Use when:

- An object structure contains many classes of objects with differing interfaces, and want to perform operations on these objects that depend on their concrete classes.
- Many distinct and unrelated operations need to be performed on objects in an object structure, and want to avoid "polluting" their classes with these operations.
- The classes defining the object structure rarely change, but often want to define new operations over the structure.

### Participants

#### Visitor

- Declares a Visit operation for each class of ConcreteElement in the object structure.
- Operation's name and signature identifies the class that sends the Visit request to the visitor.
- Visitor can access the element directly through its particular interface.

#### ConcreteVisitor

- Implements each operation declared by Visitor.
- Each operation implements a fragment of algorithm deinfed for the corresponding class of object in structure.

#### Element

- Defines an Accept operation that takes a visitor as an argument.

#### ConcreteElement

- Implements an Accept operation that takes a visitor as an argument.

#### ObjectStructure

- Can enumerate its elements.
- May provide a high-level interface to allow the visitor to visit its elements.
- May either be a Composite or a collection such as a list of set.

### Collaborations

- Client that uses the Visitor pattern must create a ConcreteVisitor object and then traverse the object structure, visiting each element with the visitor.
- When an element is visited, it calls the Visitor operation that corresponds to its class.

### Consequences

#### Visitor makes adding new operations easy

Visitor makes it easy to add operations that depend on the components of complex objects.

#### Visitor gathers related operations and separates unrelated ones

Related behavior isn't spread over the classes defining the object structure; it is localized in a visitor. Unrelated sets of behavior are partitioned in their own visitor subclasses.

#### Adding new ConcreteElement classes is hard

Each ConcreteElement gives rise to a new abstract operation on Visitor and a corresponding implementation in every ConcreteVisitor class. Key consideration in applying this pattern is whethere you are most likely to change the algorithm applied over an object structure or the classes of objects that make up the structure.

#### Visiting across class hierarchies

An iterator can visit the objects in a structure, but can't work across object structures with different types of elements. Visitor does not have this restriction.

#### Accumulating state

Visitors can accumulate state as they visit each element in the object structure.

#### Breaking encapsulation

Visitor's approach assumes that the ConcreteElement interface is powerful enough to let visitors do their job. As a result, the pattern often forces you to provide public operations that access an element's internal state, which may compromise its encapsulation.

### Example

```py
from __future__ import annotations
from abc import ABC, abstractmethod
from typing import List


class Component(ABC):
    "Takes base visitor interface as argument"
    @abstractmethod
    def accept(self, visitor):
        pass


class ConcreteComponentA(Component):
    def accept(self, visitor):
        "Defines the specific class of ConcreteComponentA, can only work with this"
        visitor.visit_concrete_component_a_(self)

    def exclusive_method_component_a(self):
        "Concrete Components may have special methods that don't exist in their base class or interface. Visitor is still able to use these methods as it is aware of component's concrete class"
        return "A"


class ConcreteComponentB(Component):
    def accept(self, visitor):
        visitor.visit_concrete_component_b(self)

    def exclusive_method_component_b(self):
        return "B"


class Visitor(ABC):
    @abstractmethod
    def visit_concrete_component_a(self, element):
        pass

    @abstractmethod
    def visit_concrete_component_b(self, element):
        pass


class ConcreteVisitor1(Visitor):
    def visit_concrete_component_a(self, element):
        print('hello')

    def visit_concrete_component_b(self, element):
        print('hello world')


if __name__ == "__main__":
    components = [ConcreteComponentA(), ConcreteComponentB()]

    for component in components:
        component.accept(ConcreteVisitor1())
```
