## Redux-Saga

Sagas are implemented as generator functions that yield objects to the redux-saga middleware.

```js
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducers";
import rootSaga from "./saga";

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware();
// mount it on the store
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
// run the saga
sagaMiddleware.run(rootSaga);
```

## Watchers and Workers

Main saga file is usually split into Watchers and Workers. Watcher saga sees every action that is dispatched to the redux store; if it matches the action it is told to handle, it will assign it to its worker saga. Worker saga runs all side-effects it was meant to do.

```js
// watcher saga
export function* watchGetItems() {
    yield takeEvery("GET_ITEMS_REQUEST_ACTION", getItems);
}
// worker saga
export function* getItems() {
    // first yield to call an API
    // call is blocking i.e. saga will not continue until API call is finished
    const items = yield call(api.getItems);
    // second yield dispatches another action
    yield put({
        type: "GET_ITEMS_SUCCESS_ACTION",
        payload: items,
    });
}
```

## Effect Creators

### select

Returns full state of the application.

### put

Dispatches an action into the store (non-blocking).

### call

Runs a method, promise or other Saga (blocking).

### take

Waits for a redux action/actions to be dispatched into the store (blocking).

### cancel

Cancels the saga execution.

### fork

Performs a non-blocking call to generator or function that returns a promise. Useful to call fork on each of the sagas you want to run when you start your application since it will all sagas concurrently (non-blocking).

### debounce

Prevents calling saga until actions are settled off.

### throttle

Ignore incoming actions for a given period while processing a task.

### delay

Blocks execution for pre-defined number of milliseconds.

## Effect Combinators

### race

Race between multiple sagas. When one finishes, all other sagas are cancelled.

### all

Runs multiple effects in parallel and wait for all of them to complete.

## Helpers

### takeEvery

Takes every matching action and run the given saga (non-blocking).

### takeLatest

Takes every matching action and run given saga, but cancels every previous saga that is still running (blocking).
