## Custom Hooks

Custom hooks are regular functions that help to share stateful logic between components without forcing you to add more components to the tree. Allows to extract components logic into a reusuable function. Starts with 'use' and may call other hooks and React states. As hooks are functions, can pass information between them.

**Components that use the same hook do not share state as all state and effects inside are isolated**. For each call to the custom hook, React's POV is that the component simply calls useState and useEffect, and both can be used many times in a component and are completely independent.

When returning values, can either return as an object or array destructuring. Values returned can be variable, string, object, or function.

```js
return { x, y, z }; // when calling custom hooks, need to use the SAME reference x, y, z
return [x, y, z]; // can name variables yourself in components calling custom hooks

// when using multiple instances of hook in single component, use array return
```

https://alterclass.io/blog/5-react-custom-hooks-you-should-start-using-explained

### Boolean Example

```js
const useBoolean = () => {
    const [state, setState] = React.useState();

    const handleTrue = () => setState(true);
    const handleFalse = () => setState(false);
    const handleToggle = () => setState(!state);

    return [
        state,
        {
            setTrue: handleTrue,
            setFalse: handleFalse,
            setToggle: handleToggle,
        },
    ];
};
```

### Fetch API Example

```js
// fetch api
import { useState, useEffect } from "react";

const useFetch = (url = "", options = null) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check if component using hook is still mounted to update state variables, otherwise introduce memory leaks
        let isMounted = true;

        setLoading(true);

        fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
                if (isMounted) {
                    setData(data);
                    setError(null);
                }
            })
            .catch((error) => {
                if (isMounted) {
                    setError(error);
                    setData(null);
                }
            })
            .finally(() => isMounted && setLoading(false));

        return () => (isMounted = false);
    }, [url, options]);

    return { loading, error, data };
};

export default useFetch;
```

```js
// using hook
import useFetch from "./useFetch";

const App = () => {
    const { loading, error, data = [] } = useFetch("https://hn.algolia.com/api/v1/search?query=react");

    if (error) return <p>Error!</p>;
    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <ul>
                {data?.hits?.map((item) => (
                    <li key={item.objectID}>
                        <a href={item.url}>{item.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
```

### Counter Example

```javascript
// counter hook
const useCounter = (forwards = true) => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        // enter code here
        if (forwards) {
            setCounter((prevCounter) => prevCounter + 1);
        } else {
            setCounter((prevCounter) => prevCounter - 1);
        }
    }, [forwards]);

    return counter; // return states to be used in components
};

export default useCounter;
```

```javascript
// component:
const ForwardCounter = () => {
    useCounter(true); // states declared in hook will be tied to individual component (not shared)

    return <Card>{counter}</Card>;
};
```

### Local Storage Example

```js
import { useState } from "react";

const useLocalStorage = (key = "", initialValue = "") => {
    const [state, setState] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setLocalStorageState = (newState) => {
        try {
            const newStateValue = typeof newState === "function" ? newState(state) : newState;
            setState(newStateValue);
            window.localStorage.setItem(key, JSON.stringify(newStateValue));
        } catch (error) {
            console.error(`Unable to store new value for ${key} in localStorage.`);
        }
    };

    return [state, setLocalStorageState];
};

export default useLocalStorage;
```
