## Custom Hooks:
Regular functions that can contain stateful logic. Can use React Hooks and React states.

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
