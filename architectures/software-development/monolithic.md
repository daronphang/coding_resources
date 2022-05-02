### Monolithic

Approach is considered to be a default/tranditional model for creating a software application i.e. built as a single and indivisible unit. Such a solution usually comprises a client-side user interface, a server-side application, and a database.

Monolithic applications have one large code base and lack modularity. Updates will require changes to the entire stack.

### Strengths

- Less cross-cutting concerns such as logging, handling, caching, performance monitoring.
- Easier debugging and testing and for running E2E tests.
- Simple to deploy and develop.

### Drawbacks

- Scaling increases complexity and may be difficult to understand.
- Harder to implement changes and overall development process takes much longer.
- Continuous deployment is difficult.
- Unable to scale components independently.
- Difficult to apply a new technology as the entire application has to be rewritten (new technology barrier).
