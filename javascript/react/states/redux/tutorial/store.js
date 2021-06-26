import { createStore } from 'redux';

// reducer
const counterReducer = (state = {counter: 0}, action) => {
  if (action.type === 'INCREMENT') {
    return {
      counter: state.counter + 1
    };
  }
  
  if (action.type === 'DECREMENT') {
    return {
      counter: state.counter - 1
    };
  }
}

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
