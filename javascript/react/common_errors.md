## State Update Warnings on Unmounted Components:
Can't perform a React state update on an unmounted component. 

```js
  useEffect(() => {
    let isMounted = true;
    const timeout = setTimeout(() => {
      if (isMounted) {
        setOpenSnackbar(false);
      }
    }, 3000);
    if (openSnackbar) {
      setTimeout(timeout);
    }
    return () => {
      clearTimeout(timeout);
      isMounted = false;
    };
  }, [openSnackbar]);

```

https://medium.com/@shanplourde/avoid-react-state-update-warnings-on-unmounted-components-bcecf054e953

### Abort Controller:
Used to cancel ongoing fetch requests. When fetching data, response will be used to setState once it resolves but need to consider situations where component querying is unmounted from DOM or data is not relevant anymore. 

```js
const Resource = () => {
  const [resource, setResource] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();
    fetch('something')
      .then(res => res.json())
      .then(res => setResource(res))
      .catch(console.log(controller.signal.aborted));
  return () => controller.abort();
  }, []);
}
```
