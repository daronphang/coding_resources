## Hooks:
New addition to React 16.8. APIs that provide an alternative to writing class-based components, and offers an alternative approach to state management and lifecycle methods. Hooks bring to functional 
components the things that were only able to do with classes. 

### Rules of Hooks:
1) Never call Hooks from inside a loop, condition or nested function.
2) Hooks should sit at top-level of component.
3) Only call Hooks from React functional components/custom Hooks and not from regular function.
4) Hooks can call other hooks.

```
useState()
useEffect()
useReducer()
useRef()
useContext()

```

## States:
Built-in React object used to manage data about the component. Needed if changes in data are reflected in UI. Key features:
- Changes in state is triggered by user action through event handlers and re-renders/evaluates the component.
- State object is initialized in constructor and can store multiple properties.
- setState() is used to change value of state object.
- State data can be modified by its own component but not from outside (private).
- Can have multiple states in single component, and separated by per component basis.
- For updating states that are dependent on previous states, pass a function into the state function.
- React provides Hooks to give functional components access to states.

## useState(initial_value):
Can set initial value and always returns an array with two elements:
1) First is current value itself, used to 'preserve' values so they don't get lost.
2) Second is always a function which can be called to set a new value (re-evaluates component).
