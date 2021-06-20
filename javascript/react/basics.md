## Basics:
React is a JS library used for building user interfaces; focus is on components (reusuable building blocks) consisting mainly of JS and HTML. React is written in Declarative way y defining the desired end/target state, and let React figure out the actual DOM instructions. Though react can be used to control parts of HTML pages, more common is the Single-Page-Application (SPA) approach whereby it controls the entire frontned of a web application. Server only sends one HTML page, and React takes over and controls the UI.

```
npx create-react-app my-app
cd my-app
npm start
```



## Props:
Immutable and are used to pass data between components (parent to child only). 


## Uncontrolled/Stateless:
Stateless/dumb components are those that do not have hold any states.
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
## Wrapper Component:
Can create your own or use <React.Fragment> or <> (empty).
```javascript
// helper/wrapper.js
const Wrapper = props => {
  return props.children;  // return content between <wrapper></wrapper>
}

export default Wrapper;
```

## React Portals:
Make HTML rendered semantically correct i.e. displaying alert/modal boxes.
```html
<!--index.html-->

<div id="overlay-root" </div> <!--instead of nesting in HTML code-->
<div id="root"></div>
```
```javascript
import ReactDOM from 'react-dom';

const ModalOverlay = props => {
  return <place HTML modal code here>
}

const ErrorModal = props => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<ModalOverlay onClick={props.onConfirm} />), document.getElementById('overlay-root'))}
    </React.Fragment>
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
