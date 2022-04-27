### Strategy (Policy)

Intent is to define a family of algorithms, encapsulate each one, and make them interchangeable.

### Motivation

Many algorithms exist for breaking a stream of text into lines. Hard-wiring all such algorithms into the classes that require them isn't desirable as it will be appropriate at different times and difficult to add new algorithms and vary existing ones.

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
