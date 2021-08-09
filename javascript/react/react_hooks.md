## React Hooks:
New addition to React 16.8. APIs that provide an alternative to writing class-based components, and offers an alternative approach to state management and lifecycle methods. Hooks bring to functional components the things that were only able to do with classes. React hooks can only be called directly in React component functions and custom hooks.

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

## useState:
Can set initial value and always returns an array with two elements:
1) First is current value itself, used to 'preserve' values so they don't get lost.
2) Second is always a function which can be called to set a new value (re-evaluates component).

```javascript
import ( useState ) from 'react';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  
  const toggleParagraphHandler = () => {
    setShowParagraph(prevShowParagraph => !prevShowParagraph);
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

## UseRef:
Available in functional components only. Alternative to state when accessing input value from forms. Don't have to log every keystroke and uses less code.

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

## Side Effects:
Main job of React is to render UI and react to user input by evaluating JSX. Side effects are anything else including storing data in storage, sending HTTP requests,
setting and managing timers, etc. These tasks must happen outside of normal component evaluation and lifecycle as they may block/delay rendering due to async nature.

## useEffect:
Side effects are handled using useEffect() which is executed after every component evaluation (or after every component render cycle) if the specified dependencies change. If there is no dependency, it will only run once. Helps to deal with code that should be executed in response to something i.e. loading component, updating email etc.

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
```
const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn)

state         State snapshot used in component re-rendering
dispatchFn    Function used to dispatch a new action i.e. trigger an update of state
reducerFn     Triggered automatically once an action is dispatched; receives latest state and returns updated state
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

