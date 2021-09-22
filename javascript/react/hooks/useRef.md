## UseRef:
Available in functional components only. Alternative to state when accessing input value from forms. Don't have to log every keystroke and uses less code.
Hook that accepts one argument as initial value and returns a mutable reference which is an object having a .current property (used for DOM node or element). 

### UseRef vs UseState:
- useRef does not trigger component re-rendering and can be useful for tracking states that change frequently. 
- When storing states in a variable, it can hold the new state without trigger re-rendering but it doesn't persist; however, the returned object from useRef will persist for full lifetime of component.
- An update to useRef will trigger shallow rendering which affects just the component.
- An update to useState will trigger deep rendering which affects parent and child components.

```js
import { useRef } from 'react';

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
