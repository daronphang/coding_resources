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

## Template:

```javascript
// ExpenseItem.js
import ExpenseDate from './ExpenseDate';
import { useState } from 'react'; 

function ExpenseItem(props) {   // props are key/value pairs
  const [title, setTitle] = useState(props.title); 
  // useState hook always returns 2 variables: current state value and function for updating it
      
  const clickHandler = () => {
    console.log('clickeedd');
    setTitle('updated!');
    };
  
  return (
    <Card className="expense-item">
      <ExpenseDate dateProxy={props.date}></ExpenseDate>   // or <ExpenseDate /> if there is no content
      <h2>{ props.title }</h2>
      <button onClick={clickHandler}>Change title</button>
    </Card>
  );
}

export default ExpenseItem;
```

```javascript
// ExpenseDate.js
function ExpenseDate(props) {  

const month = props.dateProxy.toLocaleString('en-US', {month: 'long'});
const day = props.dateProxy.toLocaleString('en-US', {day: '2-digit'});
const year = props.dateProxy.getFullYear();

  return (
  <div>
      <div>{month}</div>
      <div>{day}</div>
      <div>{year}</div>
  </div>
  );
}

export default ExpenseDate;
```

```javascript
// card.js:
// reusuable wrapper component
import './card.css';

function Card(props) {
  const classes = 'card ' + props.className;  // anything received from outside as className is added
  
  return <div className={classes}>{props.children}</div>
  // content between opening/closing of custom tags is represented by props.children
}

export default Card;
```

```javascript
// app.js:
import './ExpenseItem.css';

function() {
  const expenses = [
  {title: 'Car Insurance', date: new Date(2021, 2, 28)},
  {title: 'Utility', date: new Date(2021, 3, 28)},
]

return (
  <div>
    <ExpenseItem>
      title={expenses[0].title}
      date={expenses[0].date}
    </ExpenseItem>
  </div>
)
}
```
