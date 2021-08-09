## Custom Hooks:
Custom hooks are regular functions that help to share stateful logic between components without forcing you to add more components to the tree. Starts with 'use' and may call other hooks and React states. Components that use the same hook do not share state as all state and effects inside are isolated.

```javascript
// custom hook function
const useCounter = (forwards = true) => {
  const [counter, setCounter] = useState(0);
  
  useEffect(()=> {
    // enter code here
    if (forwards) {
      setCounter((prevCounter) => prevCounter + 1)
    } else {setCounter((prevCounter) => prevCounter - 1)}
  }, [forwards])
  
  return counter;   // return states to be used in components
}

export default useCounter;
```
```javascript
// component:
  const ForwardCounter - () => {
    useCounter(true);   // states declared in hook will be tied to individual component (not shared)
    
    return <Card>{counter}</Card>;
  };

```
