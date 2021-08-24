## Parent to Child:
Use props. Immutable and are used to pass data between components (parent to child only). 

```javascript
// parent component:
const ParentComponent = () => {
  ...
  let value = 'hello world';
  return (
    <div>
      <ChildComponent parentValue = {value} />
    </div>
  )
}

// child component:
const ChildComponent = (props) => {
  let message = this.props.parentValue
}

```

## Child to Parent:
Create a callback function in parent component which receives the data from child component as an argument. Pass the callback function in parent as prop to child component. Child component calls the parent callback function using props.
```javascript
// NewExpense.js (parent component)

const NewExpense = () => {
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    };
  };
  
  return (
    <div className="new-expense">
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
    </div>
  )
}

// ExpenseForm.js (child component)

const ExpenseForm = (props) => {
  ...
  
  const SubmitHandler = (event) => {
    props.onSaveExpenseData(enteredExpenseData);  // function defined in parent executed in child component
                                                  // argument passed is received as value in saveExpenseDataHandler()
  }
}
```

## Two-Way Binding:
Achieved by using useState() and setting it as input value.

```javascript
const function = () => {
  const [enteredTitle, setEnteredTitle] = useState('');
  
  submitHandler = () => {
    event.preventDefault();
    setEnteredTitle('');    // clearing input value
  }
  
  return (
    <form onSubmit={submitHandler}>
      <input type="text" value={enteredTitle} onChange={titleChangeHandler}>
    </form>
  )
}

```

## Props vs State:
- Both hold information relating to component but are used differently.
- Props contains information set by parent component and are immutable.
- State contains 'private' information for component to initalize, change and use on it's own.
- Props are passed into the component whereas State is created in the component.

## Showing Different Components on Event:
Use short circuiting and useState from React Hook.  
```js
import React from 'react';
import LoginComponent from './login';

export default function HomeComponent() {
  const [showLogin, setShowLogin] = React.useState(false);
  const handleLoginComponent = () => {
    setShowLogin(true);
  }
  
  return (
    <React.Fragment>
      {showLogin && <LoginComponent />}
    </React.Fragment>
  )
}
```
