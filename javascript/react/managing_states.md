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

## State Updates: 
When a state is updated, React schedules it with the new state; however, it does not immediately get executed but gets put on priority list i.e. listening to user input has higher
priority than changing text on screen. Can have multiple outstanding scheduling at the same time. Hence, need to always use function for state changes that depends on previous state. Alternative way is to use useEffect() which always runs whenever there is a change in state.

```javascript
setShowParagraph((prevShowParagraph) => !prevShowParagraph);
```
