### Redux

Library with state management pattern that stores states in central store i.e. centralized place to make changes. When changing states, services/components will dispatch actions where updated states are sent to Reducers which will reduce/combine state. State changes must always be immutable i.e. cannot edit existing/previous state. NgRx is a Redux version for Angular.

Main purpose of redux pattern is to provide a predictable state container based on three principles:

1. Single source of truth i.e. state of whole application is stored in an object tree within a single store.
2. State is read-only/immutable; actions are dispatched instead i.e. getting, adding, removing, updating state.
3. Changes are made with pure functions through Reducer function which returns a new state object.

Flow: Components -> dispatch actions -> Reducers return new state to Store -> State is updated in component through Subscription.

```
$npm install redux react-redux
$npm install @reduxjs/toolkit
```

### Actions

Actions are triggers that can result in state changes. An object that contains a key called "type", and "payload" for optional extra data. Dispatched to Reducer from Components. Actions reach out to all Reducers; need return DEFAULT case if no case found. Have two properties:

1. type: read only string describing what the action stand for.
2. payload: the data sent to the Reducer (not all actions need a payload).

Can prefix for larger applications as different components may have same action name i.e. "[SHOPPING LIST] Add Ingredients".

```javascript
dispatch();
```

### Reducers

Pure functions that has no side effects, and its return value is determined only by its inputs. Functions that reduce/transform input data. Accepts two arguments, previous State and Action. When an Action is dispatched, Redux goes through all reducers in the order the Reducers were created until it finds a case for that Action. Must always return a new state object (same input returns same output). NEVER MUTATE a state but ALWAYS OVERRIDE existing state as best practice.

### Effects

If an Effect gets triggered by dispatching an Action, this means side effects are going to happen before calling the Reducer i.e. http requests. Effects listen if any Action is dispatched and checks if it has a a case for Action type. After performing side effect, emits another Action referring to the result-state of side effect (success/error), and Reducer finally enters the scene. For Effects, it must always return a non-erronous Observable as the pipe operator cannot die; hence, use of().

### Store

Database of application comprising of different states that are immmutable and only altered by actions. An object that holds application state and brings Actions, Reducers and Selectors together i.e. when an action is dispatched, the store finds and executes the appropriate Reducer. Store folder contains Actions, Effects, Reducers, Selectors and State folders.
