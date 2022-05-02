### Creational Patterns

Abstract the instantiation process i.e. make a system indepedent of how its objects are created, composed, and represented. A class creational pattern uses inheritance to vary the class that's instantiated, whereas an object creational pattern will delegate instantiation to another object.

Creational patterns become important as systems evolve to depend more on object composition than class inheritance i.e. instead of hardcoding a fixed set of behaviors, to define a smaller set of fundamental behaviors that can be composed into any number of more complex ones.

There are two recurring themes in these patterns. First, they all encapsulate knowledge about which concrete classes the system uses. Also, they hide how instances of classes are created and put together. All the system knows about the objects is their interfaces as defined by abstract classes and hence, give flexibility in what gets created, who creates it, how it gets created, and when. Configuration can be static (compile-time) or dynamic (run-time).

### Discussion

Two common ways to parameterize a system by the classes of objects it creates. One way is to subclass the class that creates the objects using the Factory Method pattern. However, thsis requires creating a new subclass to change the class of the product and may also cascade. Other way relies more on object composition whereby we define the object that's responsible for knowing the class of the product objects and make it a parameter of the system.

Factory Method makes a design more customizable and only a little more complicated. Other design patterns require new classes, whereas Factory Method requires a new operation. People often use Factory Method as the standard way to create objects, but it isn't necessary when the class that's instantiated never changes or when instantiation takes place in an operation that subclasses can easily override, such as an initialization operation.

### Factory Comparison

https://refactoring.guru/design-patterns/factory-comparison
