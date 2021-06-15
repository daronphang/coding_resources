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
// ExpenseDate.js
import React from 'react';

import './ExpenseDate.css';

const ExpenseDate = (props) => {
  const month = props.date.toLocaleString('en-US', { month: 'long' });
  const day = props.date.toLocaleString('en-US', { day: '2-digit' });
  const year = props.date.getFullYear();

  return (
    <div className='expense-date'>
      <div className='expense-date__month'>{month}</div>
      <div className='expense-date__year'>{year}</div>
      <div className='expense-date__day'>{day}</div>
    </div>
  );
};

export default ExpenseDate;

```


```javascript
// ExpenseItem.js
import React from 'react';

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
  return (
    <Card className='expense-item'>
      <ExpenseDate date={props.date} />
      <div className='expense-item__description'>
        <h2>{props.title}</h2>
        <div className='expense-item__price'>${props.amount}</div>
      </div>
    </Card>
  );
}

export default ExpenseItem;

```


```javascript
// Expenses.js
import React, { useState } from 'react';

import ExpenseItem from './ExpenseItem';
import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import './Expenses.css';

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState('2020');

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  return (
    <div>
      <Card className='expenses'>
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
        />
        {props.items.map((expense) => (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
          />
        ))}
      </Card>
    </div>
  );
};

export default Expenses;


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
