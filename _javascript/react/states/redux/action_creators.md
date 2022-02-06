### Thunk

A function that delays an action until later; does not return the action itself but another function which eventually returns the action.

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
