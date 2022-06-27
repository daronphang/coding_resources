## React Redux

Redux itself is a standalone library that can be used with any UI layer/framework. When using Redux with any kind of UI framework, will normally use a "UI binding" library to tie Redux together with your UI framework.

## Integration with UI

### Understanding Redux Store Subscriptions

Redux is a dumb event emitter that has a single event type: dispatching an action.

```js
function createStore(reducer) {
    var state;
    var listeners = [];

    function getState() {
        return state;
    }

    function subscribe(listener) {
        listeners.push(listener);
        return function unsubscribe() {
            var index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    }

    // dispatch doesn't check root state to see if it changes or not
    // runs every subscriber callback after every dispatched action, regardless of whether
    // there was nay meaningful change to the state or not

    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    }

    dispatch({});

    return { dispatch, subscribe, getState };
}
```

### Standard UI Update Cycle

Using Redux with any UI layer requires the same consistent set of steps:

1. Create a Redux store.
2. Subscribe to updates.
3. Inside the subscription callback:
    - Get the current store state.
    - Extract the data needed by this piece of UI.
    - Update the UI with the data.
4. If necessary, render the UI with initial state.
5. Respond to UI inputs by dispatching Redux actions.

```js
// 1) Create a store
const store = createStore(counter);

// 2) Subscribe to store updates
store.subscribe(render);

const valueEl = document.getElementById("value");

// 3. When the subscription callback runs:
function render() {
    // 3.1) Get the current store state
    const state = store.getState();

    // 3.2) Extract the data you want
    const newValue = state.toString();

    // 3.3) Update the UI with the new value
    valueEl.innerHTML = newValue;
}

// 4) Display the UI with the initial store state
render();

// 5) Dispatch actions based on UI inputs
document.getElementById("increment").addEventListener("click", () => {
    store.dispatch({ type: "INCREMENT" });
});
```

However, writing this logic would become very reptitive, and optimizing UI performance would require complicated logic.

The process of subscribing to the store, checking for updated data, and triggering a re-render can be more generic and reusuable.

### Connect.js

Purpose of connect() is that you don't have to think about subscribing to the store or perform optimizations yourself. Instead, you specify how to get props based on Redux store state.

## Why Use React Redux

### Official Redux UI Bindings for React

Maintained directly by Redux team and ensures it is kept up-to-date with any API changes.

### Implements Performance Optimizations

By default, any updates to a component will cause React to re-render all of the components inside that part of the component tree. React Redux implements performance optimizations internally, so your component only re-renders when it actually needs to.

Also, it ensures each connected component only extracts the specific pieces of data from the store state that are needed by that component.
