## UseRef:
React framework is meant to abstract code away from DOM manipulation; however, useRef opens door for developers to access it i.e. can gain access to actual HTML element by creating a React reference and passing it to the element itself. 

### Rule of Thumb:
When you need to imperatively call a function for a behavior React doesn't allow you to control i.e. need to call a function, but that function has no association with React method or artifact.

### Functional vs Class:
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
```

## ForwardRef:
Method that allows parent components passdown/forward refs to their children i.e. gives child component a reference to a DOM element created by parent component. This allows the child to read and modify that element anywhere it is being used. Can manipulate with native Javascript functions that are unavailable in React library. 

Typically, parent components pass data down to their children via props; to change the behavior of child component, need to render with new set of props. With refs, have access to DOM node that is represented by an element and hence, can modify it without touching its state or re-rendering it. Common scenarios include managing focus, selection, incrementing values (counter), media playback, animations and integration with DOM-based libraries.

## Focus Example:
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
