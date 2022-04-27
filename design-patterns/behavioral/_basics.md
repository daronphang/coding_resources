### Behavioral Patterns

Behavioral patterns are concerned with algorithms and assignment of responsibilities between objects. They describe not just patterns of objects or classes, but also the patterns of communication between them. These patterns characterize complex control flow that's difficult to follow at run-time.

Behavioral class patterns use inheritance to distribute behavior between classes. Behavioral object patterns use object composition.

### Command versus Memento

- Command pattern re-execute commands in the same order that changed attributes of a state.
- Memento completely replaces the state by retrieving from a cache/store.

### Encapsulating Variation

Encapsulating variation is a theme of many behavioral patterns. When an aspect of a program changes frequently, these patterns define an object that encapsulates that aspect, and other parts of the program can collaborate with the object whenever they depend on that aspect:

- A Strategy object encapsulates an algorithm.
- A State object encapsulates a state-dependent behavior.
- A Mediator object encapsulates the protocol between objects.
- An Iterator object encapsulates the way you acess and traverse the components of an aggregate object.

Most patterns have two kinds of objects: the new object that encapsulate the aspect, and the existing object that use the new ones. Functionality of new objects would be an integral part of the existing objects.

### Sumamry

Behavioral patterns complement and reinforce each other:

- Chain of Responsibility will probably include Template Method.
- Chain can use Command pattern to represent requests as objects.
- Interpreter can use State pattern to define parsing contexts.

Works well with other patterns:

- Composite pattern might use Visitor to perform operations on components of composition.
- Composite pattern could use Chain to let components access global properties.
- Composite pattern could use Decorator to override properties through their parent.
