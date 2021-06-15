## Basics:
React is a JS library used for building user interfaces; focus is on components (reusuable building blocks) consisting mainly of JS and HTML. React is written in Declarative way y defining the desired end/target state, and let React figure out the actual DOM instructions. Though react can be used to control parts of HTML pages, more common is the Single-Page-Application (SPA) approach whereby it controls the entire frontned of a web application. Server only sends one HTML page, and React takes over and controls the UI.

Data is passed from one component to another via props or properties. 

```
npx create-react-app my-app
cd my-app
npm start
```

## States:
Needed if changes in data are reflected in UI. React will re-evaulate the component in which the state was registered. Separated on per component basis. Can be used to store values. Can have multiple states in single component. For updating states that are dependent on previous states, pass a function into the state function.

useState always returns an array with two elements, and the second is always a function which can be called to set a new value. Calling that function will also trigger React to re-evaulate the component.

Stateless/dumb components are those that do not have hold any states.

## Controlled vs Uncontrolled Components:
If the logic or data is handled in parent component, the child component is uncontrolled.

## Listening to User Input:
Use onChange().
```javascript

const ExpenseForm = () => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);  // always return a string
  };
  
  const submitHandler = (event) => {
    event.preventDefault();   // prevent page from reloading
    const expenseData = {
      title: enteredTitle,    // points to states
      date: new Date(enteredDate)
    }
    enteredTitle = ''; // clear submitted form
  }
  
  return (
    <form onSubmit={submitHandler}>
      <input value={enteredTitle} type="text" onChange(titleChangeHandler) /> // value allows two-way binding
  )
}

// for multiple states:
const [userInput, setUserInput] = useState({
    enteredTitle: '',                             // pass an object
    enteredDate: '',
    }) 

const titleChangeHandler = (event) => {
  setUserInput((prevState) => {
    return {...prevState, enteredTitle: event.target.value}   // overrides title and ensures others are not thrown away
  });
  
}
```

