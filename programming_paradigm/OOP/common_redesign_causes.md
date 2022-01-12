### Common Causes of Redesign

#### Creating an object by specifying class explicitly

Specifying a class name when you create an object commits you to a particular implementation instead of a particular interface. This commitment can complicate future changes. To avoid it, create objects indirectly.

Design patterns: Abstract Factory, Factory Method, Prototype

#### Dependence on specific operations

When you specify a particular operation, you commit to one way of satisfying a request. Avoiding hard-coded requests makes it easier to change during run-time and compile-time.

Design patterns: Chain of Responsibility, Command

#### Dependence on hardware and softare platform

External OS interfaces and APIs are different across different hardware and software platforms; software should not depend on a particular platform as it will be harder to port over.

Design patterns: Abstract Factory, Bridge

#### Dependence on object representations/implementations

Clients that know how an object is represented, stored, located might need to change when the object changes. Hiding this information can prevent changes from cascading.

Design patterns: Abstract Factory, Bridge, Memento, Proxy

#### Algorithmic dependencies

Objects that depend on an algorithm will have to change when it changes and hence, should be isolated.

Design patterns: Builder, Iterator, Strategy, Template Method, Visitor

#### Tight Coupling

When a group of classes are highly dependent on one another. Scenario arises when a class assumes too many responsibilities, or when one concern is spread over many classes rather than having its own class. Reduces flexibility and resusability of code, and makes changes more difficult and impedes testability.

Loose coupling is achieved by means of design that promotes single-responsibility and separation of concerns. A loosely-coupled class can be consumed and tested independently of other concrete classes. Interfaces are a powerful tool to use for decoupling. Classes can communicate through interfaces rather than own concrete classes, and any class can be on the other end of that communication simply by implementing the interface.

When writing software, change is inevitable; loose-coupling enables changes to be made easily and quickly without bugs i.e. output response in CSV/JSON, connections to different databases, testing.

Design patterns: Abstract Factory, Bridge, Chain of Responsibility, Command, Facade, Mediator, Observer

#### Extending functionality by subclassing

When subclassing, every new class has a fixed implementation overhead(initialization, finalization, etc). Defining a subclass also requires an in-depth understanding of parent class. Operations may also be overriden unexpectedly.

Object composition and delegation provide flexible alternatives to inheritance for combining behavior. New functionality can be added to an application by composing existing objects in new ways rather than by defining new subclasses of existing classes. However, can make designs harder to understand.

Design patterns: Bridge, Chain of Responsibility, Composite, Decorator, Observer, Strategy

#### Inability to alter classes conveniently

Sometimes need to modify classes from commerical library, or any change would require modifying lots of existing subclasses.

Design patterns: Adapter, Decorator, Visitor
