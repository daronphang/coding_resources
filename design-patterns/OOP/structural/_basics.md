### Structural Patterns

Structural patterns are concerned with how classes and objects are composed to form larger structures. Structural class patterns use inheritance to compose interfaces or implementations whereas structural object patterns describe ways to compose objects to realize new functionality. The added flexibility of object composition comes from the ability to change composition at run-time, which is impossible with static class composition.

### Adapter versus Bridge

- Both promote flexibility by providing a level of indirection to another object.
- Both involve forwarding requests to object from an interface other than its own.
- Adapter focuses on resolving incompatibilities between two existing interfaces.
- Bridge bridges an abstraction and its potentially numerous implementations (provides stable interface to clients even as it lets you vary classes that implement it).
- Adapter pattern makes things work after they're designed; Bridge makes them work before they are.

### Composite versus Decorator versus Proxy

- Composite and decorator both rely on recursive composition to organize an open-ended number of objects.
- Decorator is designed to add responsibilities to objects without subclassing; avoids explosion of subclasses that can arise from trying to cover every combination of responsibilities statically.
- Composite focuses on structuring classes so that many related objects can be treated uniformly, and multiple objects treated as one.
- Both Composite and Decorator allow you to build applications just by plugging objects together without defining new classes.
- Like Decorator, Proxy pattern composes an object and provides an identical interface to clients.
- Decorator addresses the situation where an object's total functionality can't be determiend at compile time.
