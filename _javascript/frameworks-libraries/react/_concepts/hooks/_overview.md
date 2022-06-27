## React Hooks

New addition to React 16.8. APIs that provide an alternative to writing class-based components, and offers an alternative approach to state management and lifecycle methods. Hooks bring to functional components the things that were only able to do with classes. React hooks can only be called directly in React component functions and custom hooks.

### Rules of Hooks

1. Never call Hooks from inside a loop, condition or nested function (to preserve state of Hooks).
2. If want to run an effect conditionally, put condition inside Hook.
3. Hooks should sit at top-level of component (React relies on order in which Hooks are called).
4. Only call Hooks from React functional components/custom Hooks and not from regular function.
5. Hooks can call other hooks.

```
useState()
useContext()
useRef()
useCallback()
useMemo()
useEffect()
useReducer()
```
