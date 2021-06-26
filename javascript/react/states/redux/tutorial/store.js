import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import authReducer from './auth';

const store = configureStore({
  // reducer: {counter: counterSlice.reducer, auth: authSlice.reducer}    // for bigger apps, creates a map of reducers
  reducer: counterSlice.reducer
});

export default store;
