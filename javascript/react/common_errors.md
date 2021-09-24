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
