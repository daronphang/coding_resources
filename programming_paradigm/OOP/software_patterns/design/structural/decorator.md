### Decorator (Wrapper)

Attach additional responsibilities to an object dynamically. Decorates provide a flexible alternative to subclassing for extending functionality. Sometimes we want to add responsibilities to individual objects, not to an entire class. One way is with inheritance but is inflexible as the choice is made statically.

Decorator confirms to the interface of the component it decorates so that its presence is transparent to component's clients. Transparency allows you to nest decorators recursively and hence, allowing an unlimited number of added responsibilities.

### Applicability

- To add responsibilities to individual objects dynamically and transparently i.e. without affecting other objects.
- For responsibilities that can be withdrawn.
- When extension by subclassing is impractical.

### Consequences

#### More flexibility than static inheritance

Decorator pattern provides a more flexible way to add responsibilities to objects which can be added/removed during run-time.

#### Avoids feature-laden classes high up in the hierarchy

Decorator offers pay-as-you-go approach to adding responsibilities by adding functionality incrementally with Decorator objects.

#### Decorator and its component are not identical

Decorator acts as a transparent enclosure. Should not rely on object identity when you use decorators.
