## Creating Redux Store

Slice is a collection of Redux reducer logic and actions for a single feature in your app.

```js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    // redux slices
    // we want to have a state.counter of Redux state object
    // and counterReducer to handle to state changes
    counter: counterReducer,
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer
  }
})
```

## Reducers and Immutable Updates

```js
// this is illegal!
state.value = 123

// this is afe
return {
  ...state,
  value: 123
}
```