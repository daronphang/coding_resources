## Basics:
React is a JS library used for building user interfaces; focus is on components (reusuable building blocks) consisting mainly of JS and HTML. React is written in Declarative way defining the desired end/target state, and let React figure out the actual DOM instructions. Though react can be used to control parts of HTML pages, more common is the Single-Page-Application (SPA) approach whereby it controls the entire frontned of a web application. Server only sends one HTML page, and React takes over and controls the UI.

```
npx create-react-app my-app
cd my-app
npm start
```

## Handling Events:
With JSX, need to pass a function as the event handler and not a string. Full list of events: https://reactjs.org/docs/events.html#mouse-events.
```javascript
function Todo(props) => {
  // document.querySelector('button').addEventListener('click');   this is imperative approach, not declarative
  
  return (
    <div>
      <button className="button" onClick={function()}></button>
    </div>
  )
}

```

## Lifting State Up:
Sometimes we have state that's located within a particular component that also needs to be shared with sibling components. Instead of using an entire state management library like Redux or React Context, can just lift state up to closest common ancestor (parent component as a single source of truth) and pass both state variables and values down through props to update the state. 


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

## Converting string into HTML:
Use dangerouslySetInnerHTML function.
```js
const productDescription = `
        <div>
            <p>
                When a split second can mean the difference between victory and defeat,
                the absolute speed of the Razer Huntsman Tournament Edition is what 
                separates the champions from everyone else. Designed and tested by Team Razer athletes, 
                this gaming keyboard is armed with the fastest Razer switches we’ve ever designed, to 
                give you the edge you need to thrive where the competition is fiercest.
            </p>
            <br />
            <p>
                RAZER™ LINEAROPTICAL SWITCH
            </p>
            <br />
            <p>
                With 1.0mm optical actuation that registers at the speed of light, expect nothing but instant response from every keystroke, as you react and execute clutch plays with clinical efficiency.
                Tested to have an industry-leading durability of up to 100 million keystrokes, the Razer™ Linear Optical Switches are also well-equipped to withstand the rigors of training and competitive play.
            </p>
        </div>
        `

return (
  <div dangerouslySetInnerHTML={{__html: productDescription}}></div>
)
```


## Wrapper/Fragment Component:
JSX requires one root element that return a constant or variable. Can create your own or use <React.Fragment> or <> (empty).
```javascript
// helper/wrapper.js
const Wrapper = props => {
  return props.children;  // return content between <wrapper></wrapper>
}

export default Wrapper;
```

```javascript
// Fragments
return (
  <React.Fragment>
    <h2>hi</h2>
    <p>this works</p>
  </React.Fragment>
)

return (
  <>
    <h2>hi</h2>
    <p>this works</p>
  </>
)
```

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

## React Portals:
When displaying modals/alert boxes, they are overlays to the entire page and in HTML, it should be above everything else instead of nested in some HTML code. Portals help to make HTML rendered semantically correct and provide a clean HTML structure persepective.

```html
<!--index.html-->
<div id="backdrop-root" </div>
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

## Uncontrolled/Stateless:
Stateless/dumb components are those that do not have hold any states.
If the logic or data is handled in parent component, the child component is uncontrolled.
