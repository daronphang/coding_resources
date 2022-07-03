## Provider

Makes Redux store available to the rest of the app.

```js
import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "./store";

import App from "./App";

// As of React 18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
```

## Hooks

Recommended to use hooks API as the default approach instead of "connect" API.

```
useSelector     Reads a value from the store state
useDispatch     Returns dispatch method to let you dispatch actions
useStore        Recommended approach to access current store instance
```

```js
export function Counter() {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();

    return (
        <div>
            <div className={styles.row}>
                <button className={styles.button} aria-label="Increment value" onClick={() => dispatch(increment())}>
                    +
                </button>
                <span className={styles.value}>{count}</span>
                <button className={styles.button} aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                    -
                </button>
            </div>
            {/* omit additional rendering output here */}
        </div>
    );
}
```

## Custom Context

Useful when you are building a complex reusable component, and don't want your store to collide with any Redux store your consumers' applications might use.

```js
import React from "react";
import { Provider, createStoreHook, createDispatchHook, createSelectorHook } from "react-redux";

const MyContext = React.createContext(null);

// Export your custom hooks if you wish to use them in other files.
export const useStore = createStoreHook(MyContext);
export const useDispatch = createDispatchHook(MyContext);
export const useSelector = createSelectorHook(MyContext);

const myStore = createStore(rootReducer);

export function MyProvider({ children }) {
    return (
        <Provider context={MyContext} store={myStore}>
            {children}
        </Provider>
    );
}
```
