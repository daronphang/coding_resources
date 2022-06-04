const redux = require('redux');

// store
const store = redux.createStore(counterReducer);
store.subscribe(counterSubscriber);

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

// subscriber
const counterSubscriber = () => {
  store.getState();
}

// actions
store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'DECREMENT'});
