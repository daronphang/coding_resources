### Middlewares

Redux manages your application state synchronously. One of the main concepts is Reducers and should never perform side-effects inside them. To solve this, can use middleware which provides a third-party extension point between dispatching an action, and the moment it reaches the reducer.

### Attributes of Good Redux Middleware

1. Access to Redux store.
2. Ability to dispatch another action from within the middleware.
3. Ability to run and cancel side-effects.
4. Allow user to trigger action multiple times.
5. Run same specific side effect for different dispatched actions.
6. Ability to debounce i.e. delay side effect.
7. Throttle/regulate the rate at which side-effects are running.
8. Race condition to cancel remaining side-effects.
9. Ability to run side-effects in parallel.
