## Basics

Built-in React object used to manage data about the component. Needed if changes in data are reflected in UI. Key features:

-   Changes in state is triggered by user action through event handlers and re-renders/evaluates the component.
-   State object is initialized in constructor and can store multiple properties.
-   setState() is used to change value of state object.
-   State data can be modified by its own component but not from outside (private).
-   Can have multiple states in single component, and separated by per component basis.
-   For updating states that are dependent on previous states, pass a function into the state function.
-   React provides Hooks to give functional components access to states.

## useState

Can set initial value and always returns an array with two elements:

1. First is current value itself, used to 'preserve' values so they don't get lost.
2. Second is always a function which can be called to set a new value (re-evaluates component).

```javascript
import ( useState ) from 'react';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);


  const toggleParagraphHandler = () => {
    setShowParagraph(true);   // updating state with value and triggers re-rendering of component (not async reason)
    setShowParagraph(showParagraph => !showParagraph);  // updating state with callback function

    setCount(count => count + 1);

    setItems(items => [...items, 'new item']);

    console.log(showParagraph);   // won't show updated state here due to scope of closure function (not due to asynchronous)
                                  // state updates will reflect in the next re-render where new closures are created
  }

  return (
    <div>
    <h1> hi there </h1>
    {showParagraph && <p> this is new </p>}
    <button onClick={toggleParagraphHandler}></button>
    </div>
  )
}
```
