import { createStore } from 'redux';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {counter: 0, showCounter: true};

createSlice({   // ensures state is not mutated
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.counter++;    // okay to mutate this way as toolkit will auto clone existing state
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    }
  }
})

// dont have to copy existing state with toolkit
// const counterReducer = (initialState, action) => {
//   if (action.type === 'INCREMENT') {
//     return {
//       counter: state.counter + action.payload
//     };
//   }
  
//   if (action.type === 'DECREMENT') {
//     return {
//       counter: state.counter - 1
//     };
//   }
// }

// store
const store = createStore(counterReducer);

export default store;


// subscriber
const counterSubscriber = () => {
  store.getState();
}

// actions
store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'DECREMENT'});
