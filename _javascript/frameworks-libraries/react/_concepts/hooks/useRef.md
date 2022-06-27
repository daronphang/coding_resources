## Refs and the DOM

React framework is meant to abstract code away from DOM manipulation; however, useRef opens door for developers to access it i.e. can gain access to actual HTML element by creating a React reference and passing it to the element itself.

Typically, parent components pass data down to their children via props; to change the behavior of child component, need to render with new set of props. With refs, have access to DOM node that is represented by an element and hence, can modify it without touching its state or re-rendering it. Common scenarios include managing focus, selection, incrementing values (counter), media playback, animations and integration with DOM-based libraries.

### Rule of Thumb

Don't overuse Refs; sometimes it is clear to lift state up. Use it when you need to imperatively call a function for a behavior React doesn't allow you to control i.e. need to call a function, but that function has no association with React method or artifact.

## useRef

Available in functional components only. Alternative to state when accessing input value from forms. Don't have to log every keystroke and uses less code. Hook that accepts one argument as initial value and returns a mutable reference which is an object having a .current property (used for DOM node or element).

```javascript
// functional components
const buttonRef = useRef(null);

// class components
class ActionButton extends React.Component {
    cosntructor() {
        super();
        this.buttonRef = createRef();
    }
}

// accessing Refs
const node = this.buttonRef.current;
```

## UseRef vs UseState

-   useRef does not trigger component re-rendering and can be useful for tracking states that change frequently.
-   When storing states in a variable, it can hold the new state without trigger re-rendering but it doesn't persist; however, the returned object from useRef will persist for full lifetime of component.
-   An update to useRef will trigger shallow rendering which affects just the component.
-   An update to useState will trigger deep rendering which affects parent and child components.

```js
import { useRef } from "react";

function MyComponent() {
    const reference = useRef(initialValue);

    const someHandler = () => {
        // Access reference value:
        const value = reference.current;

        // Update reference value:
        reference.current = newValue;
    };
}
```

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

## ForwardRef

Method that allows parent components passdown/forward refs to their children i.e. gives child component a reference to a DOM element created by parent component. This allows the child to read and modify that element anywhere it is being used. Can manipulate with native Javascript functions that are unavailable in React library.

### Focus Example

```javascript
import * as React from "react";
import ReactDOM from "react-dom";

export default function App() {
    const ref = React.useRef();

    function focus() {
        ref.current.focus();
    }

    // in vanilla JS:  document.getElementById('myInput').focus()
    // however, this is bad practice to access DOM directly in React

    return (
        <div className="App">
            <input ref={ref} placeholder="my input" />
            <button onClick={focus}>Focus</button>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```
