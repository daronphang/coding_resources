## Component Optimization:
When a component re-evaluates, its child components will also get re-rendered. To only allow re-evaluation when a state has changed, can use React.memo(component), else will be skipped. Checks if props have changed values. Applicable for functional components only. However, take note that component gets re-evaluated when functions are involved even though there is no change, but not for primitive values. 

Can use useCallback() that saves a function of choice in React's internal memory and reuses the same function object. For memorizing data, use useMemo().
```javascript
false === false   // true
1 === 1           // true

[1, 2, 3] === [1, 2, 3]   // false
```

```javascript
export default React.memo(DemoOutputComponent)
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

## State Updates: 
When a state is updated, React schedules it with the new state; however, it does not immediately get executed but gets put on priority list i.e. listening to user input has higher
priority than changing text on screen. Can have multiple outstanding scheduling at the same time. Hence, need to always use function for state changes that depends on previous state. Alternative way is to use useEffect() which always runs whenever there is a change in state.

```javascript
setShowParagraph((prevShowParagraph) => !prevShowParagraph);
```

