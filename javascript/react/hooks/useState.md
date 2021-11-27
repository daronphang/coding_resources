## Basics:
Built-in React object used to manage data about the component. Needed if changes in data are reflected in UI. Key features:
- Changes in state is triggered by user action through event handlers and re-renders/evaluates the component.
- State object is initialized in constructor and can store multiple properties.
- setState() is used to change value of state object.
- State data can be modified by its own component but not from outside (private).
- Can have multiple states in single component, and separated by per component basis.
- For updating states that are dependent on previous states, pass a function into the state function.
- React provides Hooks to give functional components access to states.

## useState:
Can set initial value and always returns an array with two elements:
1) First is current value itself, used to 'preserve' values so they don't get lost.
2) Second is always a function which can be called to set a new value (re-evaluates component).

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

## Child Re-rendering:
Render is the process of converting JSX written into DOM nodes. JSX is painted on virtual DOM first and a diffing algorithm is used to compare the new vDOM to old vDOM (reconciliation) and if changes are found, they are pushed to the browser DOM. Though vDOM would rerender many times, the actual DOM would only be rerendered once and hence, performance shouldn't be impacted significantly. Component re-renders when its state is manipulated through useState(). If parent component has triggered rerender, all child components will rerender, regardless of whether the child is consuming passed props.  

https://blog.bitsrc.io/exploring-react-renders-different-ways-a-component-gets-re-rendered-edc11403b754

## Mount vs Render:
- Rendering is any time a function component gets called which returns a set of instructions for creating DOM.
- Mounting is when React "renders" the component for the first time and actually builds the initial DOM from instructions.

Re-render is when React calls the function component again to get a new set of instructions on an already mounted component.

https://reacttraining.com/blog/mount-vs-render/

## Performing Action on State Update:
To perform an action on state update i.e. reading updated value, can use useEffect() or useRef().
```js
useEffect(() => {setCount(+count + 1)}, [])
console.log(count);
```
