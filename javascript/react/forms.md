## Forms:
```javascript
const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [inputValid, setInputValid] = useState('true');
  const nameInputRef = useRef();
  
  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value)
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
          onChange={nameInputChangeHandler}/> 
          {!inputValid && <p>Name must not be empty</p>}
      </div>
      <button>Submit</button>
    </form?
  )
}

```
