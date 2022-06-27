## useReducer

More powerful state management for handling complex/multiple states, replacement for useState().

```js
const [state, dispatchFn] = useReducer(reducerFn, initialState);

// state         State snapshot used in component re-rendering
// dispatchFn    Function that accepts an object that represents the action type to execute
// reducerFn     Triggered automatically once an action is dispatched; receives latest state and returns updated state

// reducerFn accepts two parameters and returns one value; action parameter is executed by a dispatch function
// action is like the instruction passed to reducer function
reducerFn = (state, action) => {};

dispatch({ type: "incremenet" });
```

```javascript
const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({ type: "decrement" })}>-</button>
            <button onClick={() => dispatch({ type: "increment" })}>+</button>
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
