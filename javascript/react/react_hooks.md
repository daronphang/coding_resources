## React Hooks:
New addition to React 16.8. APIs that provide an alternative to writing class-based components, and offers an alternative approach to state management and lifecycle methods. Hooks bring to functional components the things that were only able to do with classes. React hooks can only be called directly in React component functions and custom hooks.

### Rules of Hooks:
1) Never call Hooks from inside a loop, condition or nested function (to preserve state of Hooks).
2) If want to run an effect conditionally, put condition inside Hook.
3) Hooks should sit at top-level of component (React relies on order in which Hooks are called).
4) Only call Hooks from React functional components/custom Hooks and not from regular function.
5) Hooks can call other hooks.

```
useState()
useContext()
useRef()
useCallback()
useMemo()
useEffect()
useReducer()
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

## useState:
Can set initial value and always returns an array with two elements:
1) First is current value itself, used to 'preserve' values so they don't get lost.
2) Second is always a function which can be called to set a new value (re-evaluates component).

```javascript
import ( useState ) from 'react';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
 
  
  const toggleParagraphHandler = () => {
    setShowParagraph(true);   // updating state with value and triggers re-rendering of component (not async reason)
    setShowParagraph(showParagraph => !showParagraph);  // updating state with callback function
    
    setCount(count => count + 1);
    
    setItems(items => [...items, 'new item']);
    
    console.log(showParagraph);   // won't show updated state here due to scope of closure function (not due to asynchronous)
                                  // state updates will reflect in the next re-render where new closures are created
  }
  
  return (
    <div>
    <h1> hi there </h1>
    {showParagraph && <p> this is new </p>}
    <button onClick={toggleParagraphHandler}></button>
    </div>
  )
}
```

### Performing Action on State Update:
To perform an action on state update i.e. reading updated value, can use useEffect() or useRef().
```js
useEffect(() => {setCount(+count + 1)}, [])
console.log(count);
```

## UseRef:
Available in functional components only. Alternative to state when accessing input value from forms. Don't have to log every keystroke and uses less code.
Hook that accepts one argument as initial value and returns a mutable reference which is an object having a .current property (used for DOM node or element). 

### UseRef vs UseState:
- useRef does not trigger component re-rendering and can be useful for tracking states that change frequently. 
- When storing states in a variable, it can hold the new state without trigger re-rendering but it doesn't persist; however, the returned object from useRef will persist for full lifetime of component.
- An update to useRef will trigger shallow rendering which affects just the component.
- An update to useState will trigger deep rendering which affects parent and child components.

```js
import { useRef } from 'react';

function MyComponent() {
  const reference = useRef(initialValue);

  const someHandler = () => {
    // Access reference value:
    const value = reference.current;

    // Update reference value:
    reference.current = newValue;
  };
}
```

```javascript
import React, { useRef } from 'react';

const Example = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  
  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;
    
    nameInputRef.current.value = ''   // to reset the form; though technically shouldnt manipulate DOM without using React
    
    <put some code here>
    
    
  }
  
  return (
    <input id="username" type="text" ref={nameInputRef}>
  )
  
}
```

## UseCallback:
Primary function is to avoid unnecessary re-renders to make app more efficient. Receives a function as a parameter and an array of dependencies; it will return a memoized version of callback and it will only change if the dependencies change. 

## UseMemo:
Similar to useCallback() but allows you to apply memoization to any value type and not just functions. 

```js
const initialCandies = ['snickers', 'skittles', 'twix', 'milky way']

// prevent re-rendering of array 
const initialCandies = React.useMemo(() => ['snickers', 'skittles', 'twix', 'milky way'], []);
```

### useMemo vs useCallback:
Optimization comes at a cost. Sometimes using useCallback() or useMemo() would make performance worse by preventing dependencies and memoized values from being garbage collected (frees up memory space). 
Most of the time shouldn't bother optimizing unnecessary re-renders as React is very fast. however, there are situations when rendering takes substantial amount of time such as graphs/charts/animations.  

Factors to consider:
- Referential Equality.
- Computationally expensive calculations.

When defining an object inside functional components, it is not going to be referentially equal to last time that same object was defined (even with same properties/values). Important when considering dependencies lists


https://kentcdodds.com/blog/usememo-and-usecallback

```js
true === true // true
false === false // true
1 === 1 // true
'a' === 'a' // true

{} === {} // false
[] === [] // false
() => {} === () => {} // false

const z = {}
z === z // true
```

```js
function Foo({bar, baz}) {
  React.useEffect(() => {
    const options = {bar, baz}
    buzz(options)
  }, [bar, baz])
  return <div>foobar</div>
}

function Blub() {
  const bar = React.useCallback(() => {}, [])
  const baz = React.useMemo(() => [1, 2, 3], [])
  return <Foo bar={bar} baz={baz} />
}
```


## Side Effects:
Main job of React is to render UI and react to user input by evaluating JSX. Side effects are anything else including storing data in storage, sending HTTP requests,
setting and managing timers, etc. These tasks must happen outside of normal component evaluation and lifecycle as they may block/delay rendering due to async nature.

## useEffect:
Side effects are handled using useEffect() which is executed after every component evaluation (or after every component render cycle) if the specified dependencies change. If there is no dependency, it will only run once. Helps to deal with code that should be executed in response to something i.e. loading component, updating email etc. Gets called after the component is rendered (or mounted for class components).

For checking form validity, the useEffect() is executed upon each change in keystroke which creates unncessary network traffic. Can avoid this using a technique called debouncing through usage of cleanup functions.

```javascript
// function runs only once as there is no dependency provided
useEffect(() => {
  console.log('running');
}, []);

// function reruns if dependencies change
useEffect(() => {}, [dependencies]);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('isLoggedIn');
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []); 
}

```

```javascript
useEffect(() => {
  // function runs after cleanup function
  const identifier = setTimeout(() => {
    console.log('checking form validity'); 
    setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6);
  }, 500);    // checks form validity after 500ms instead of every keystroke change
  
  // cleanup function runs BEFORE every new side effect function execution but not before first time
  // order is: checking form (triggers on initialization) -> user types -> CLEANUP -> checking form
  return () => {  
    console.log('CLEANUP'); 
    clearTimeout(identifier);         // resets the timer if the user is typing  
  };    
}, [enteredEmail, enteredPassword]);  // will execute again either one of them changes
                                      // dont have to add state updating functions i.e. setFormIsValid

```

## useReducer:
More powerful state management for handling complex/multiple states, replacement for useState(). 
```js
const [state, dispatchFn] = useReducer(reducerFn, initialState);

// state         State snapshot used in component re-rendering
// dispatchFn    Function that accepts an object that represents the action type to execute
// reducerFn     Triggered automatically once an action is dispatched; receives latest state and returns updated state

// reducerFn accepts two parameters and returns one value; action parameter is executed by a dispatch function
// action is like the instruction passed to reducer function
reducerFn = (state, action) => {}

dispatch({type: 'incremenet'})
```

```javascript
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

```javascript

const emailReducer = (state, action) => {   // created outside of component function as it doesnt interact anything inside
  if (action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')}
  };
    
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')}
  };
  
};  

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
}

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: false});
  
  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
  };
  
  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'})
  };
  
  // form validity
  const { isValid: emailIsValid } = emailState;   // using alias
  const { isValid: passwordIsValid } = passwordState;
  
  useEffect(() => {       // this effect will not rerun if the form is valid and user adds more keystrokes
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }; 500);
  
    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);
```

