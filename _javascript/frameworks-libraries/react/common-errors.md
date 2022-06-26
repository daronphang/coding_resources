## State Update Warnings on Unmounted Components

Can't perform a React state update on an unmounted component. For temporal use, can declare isMounted property in useEffect. However, this only hides the warning and a reference is still kept on unmounted component i.e. application will continue to execute fetch/async queries.

https://medium.com/doctolib/react-stop-checking-if-your-component-is-mounted-3bb2568a4934

```js
// TEMPORAL SOLUTION, USE ABORT INSTEAD
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

### Abort Controller (Fetch Only)

Used to cancel ongoing fetch requests. When fetching data, response will be used to setState once it resolves but need to consider situations where component querying is unmounted from DOM or data is not relevant anymore.

https://medium.com/@icjoseph/using-react-to-understand-abort-controllers-eb10654485df

```js
const Resource = () => {
    const [resource, setResource] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        fetch("something")
            .then((res) => res.json())
            .then((res) => setResource(res))
            .catch(console.log(controller.signal.aborted)); // can check if signal is aborted, if true, then skip updating error state
        return () => controller.abort();
    }, []);
};
```

### Axios

To cancel axios, use source.token instead.

https://since1979.dev/cancel-axios-request-to-prevent-react-from-yelling-at-you/

```js
import React, { useState, useEffect } from "react";
import axios from "axios";

const ComponentWithRequest = (props) => {
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axios
            .get("https://jsonplaceholder.typicode.com/todos", {
                cancelToken: source.token,
            })
            .then((response) => {
                setApiData(response.data);
            })
            .catch((err) => {
                console.log("Catched error: " + e.message);
            });

        props.toggleMounted();

        return () => {
            source.cancel("Component got unmounted");
        };
    }, [props]);

    return (
        <div className="box">
            <p>I will immediately get unmounted.</p>
        </div>
    );
};

export default ComponentWithRequest;
```
