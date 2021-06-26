## Thunk:
A function that delays an action until later; does not return the action itself but another function which eventually returns the action.

```javascript

const sendCartData = (cartData) => {
  return (dispatch) => {
    dispatch();
  };
}
```
