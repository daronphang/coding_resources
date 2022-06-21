### State Management

State management refers to how data is shared/communicated between components. The state of a component is an object that holds some information that may change over the lifetime of the component.

Redux helps to solve the two most common problems in React:

-   Extraneous props i.e. passing data many levels up the component tree which breaks single-responsibility issue.
-   Communication between interdependent components at different points of component tree.

However, Angular is a complete framework and incoherent state management is solved with Dependency Injection system i.e. injecting services into components. Moreover, RxJs offers Behavioral Subject whereby you can define initial state.

### Summary

-   Data flow must be unidirectional and predictable i.e. single source of truth (Angular strictly enforces this via input bindings).
-   Stores offer better performance, testability, and has tooling ecosystem.
-   Angular offers Dependency Injection system which is bureaucracy-free, straightfoward, and simple.
-   Redux is most likely overkill in Angular and requires alot boilerplate code.
-   Don't overcomplicate things and solve problems that don't exist.
-   State is flexible in Angular i.e. local/global, mutable/immutable.

When in doubt, refer to this quote: "You'll never know when you need Flux. If you aren't sure if you need it, you don't need it".
