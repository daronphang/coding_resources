## State Management:
Redux helps to solve the most common problem in React: extraneous props i.e. passing data many levels up the component tree which breaks single-responsibility issue.
However, Angular is a complete framework and incoherent state management is solved with Dependency Injection system i.e. injecting services into components. Moreover, RxJs offers Behavioral Subject whereby you can define initial state. 

State management in summary: 
- Data flow must be unidirectional.
- Stores offer better performance, testability, and has tooling ecosystem. 
- Angular offers Dependency Injection system which is bureaucracy-free, straightfoward, and simple. 
- Redux is most likely overkill in Angular and requires alot boilerplate code.
- Don't overcomplicate things and solve problems that don't exist.

When in doubt, refer to this quote: "You'll never know when you need Flux. If you aren't sure if you need it, you don't need it".
