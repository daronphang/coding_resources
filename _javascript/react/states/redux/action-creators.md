## Thunks

All logic in Redux is synchronous; to contain asynchronous logic, can use thunks. A function that delays an action until later; does not return the action itself but another function which eventually returns the action. Thunks are written using two functions:
- An inside Thunk function, which gets dispatch() and getState() as arguments.
- Outside creator function, which creates and returns the thunk function.


```javascript
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch();

    const sendRequest = async () => {
      const response = await fetch("http://example.com", {
        method: "PUT",
        body: JSON.stringify(cart),
      }); 

      if (!response.ok) {
        throw new Error("failed");
      }

      const responseData = await response.json();
    };

    try {
      await sendRequest();
    } catch (error) {
      // some error code here
    }
  };
};
```

```javascript
// app.js:
import { sendCardData } from "./store/cart-slice";

function App() {
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCardData(cart));
  }, [cart, dispatch]);
}
```
