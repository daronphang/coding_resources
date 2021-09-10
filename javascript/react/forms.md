## Uncontrolled:
In browser, forms maintain their own internal state. For uncontrolled, DOM manages and stores data and input is pulled from it through refs.
```js
return (
  <input type="text" name="name" ref={this.nameInput} />
)
```

## Controlled:
State is stored in the component that renders the input. Each input field accepts its current value as a prop and has callback function which is called when the state of input changes.

```javascript
const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [inputValid, setInputValid] = useState(false);
  const [inputTouched, setInputTouched] = useState(false);
  const nameInputRef = useRef();
  
  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value)
  }
  
  const nameInputBlurHandler = event => {
    setInputTouched(true);
    
    if (enteredName.trim() === '') {
      setInputValid(false);
      return;
    }
  }
  
  
  const formSubmissionHandler = event => {
    event.preventDefault();
    
    if (enteredName.trim() === '') {
      setInputValid(false);
      return;
    }
    
    setInputValid(true);

    setEnteredName('');
    // shouldnt use nameInputRef.current.value = '' as it directly manipulates to DOM, leave it to React
  }
  
  return (
    <form onSubmit={formSubmissionHandler}>
      <div class="form-control">
        <label>Your name</label>
        <input
          ref={nameInputRef}    // pointer to ref property
          type='text'
          id='name'
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          /> 
          {!inputValid && inputTouched <p>Name must not be empty</p>}
      </div>
      <button>Submit</button>
    </form?
  )
}

```
