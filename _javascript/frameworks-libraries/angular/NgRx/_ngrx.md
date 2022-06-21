## NgRx

Library with state management pattern that stores states in central store i.e. centralized place to make changes. When changing states, services/components will dispatch actions where updated states are sent to Reducers which will reduce/combine state. State changes must always be immutable i.e. cannot edit existing/previous state. NgRx is a Redux version for Angular.

Flow: Components/Services -> dispatch actions -> Reducers return new state to Store -> State is updated in component through selectors.

Main purpose of redux pattern is to provide a predictable state container based on three principles:

1. Single source of truth i.e. state of whole application is stored in an object tree within a single store.
2. State is read-only/immutable; actions are dispatched instead i.e. getting, adding, removing, updating state.
3. Changes are made with pure functions through Reducer function which returns a new state object.

### Actions

Dispatched to Reducer from Components/Services. Actions reach out to all Reducers; need return DEFAULT case. Have two properties:

1. type: read only string describing what the action stand for.
2. payload: the data sent to the Reducer (not all actions need a payload).

Can prefix for larger applications as different components may have same action name i.e. "[SHOPPING LIST] Add Ingredients".

### Reducers

Pure functions accepting two arguments, previous State and Action. When an Action is dispatched, NgRx goes through all reducers in the order the Reducers were created until it finds a case for that Action.

### Effects

If an Effect gets triggered by dispatching an Action, this means side effects are going to happen before calling the Reducer i.e. http requests. Effects listen if any Action is dispatched and checks if it has a a case for Action type. After performing side effect, emits another Action referring to the result-state of side effect (success/error), and Reducer finally enters the scene. For Effects, it must always return a non-erronous Observable as the pipe operator cannot die; hence, use of().

### Selectors

NgRx provides select() to obtain slices of object tree from Store which accepts selector function as argument. It is a function that allows some logic to be applied to the slice before using the data in components.

### Store

Database of application comprising of different states that are immmutable and only altered by actions. An object that holds application state and brings Actions, Reducers and Selectors together i.e. when an action is dispatched, the store finds and executes the appropriate Reducer. Store folder contains Actions, Effects, Reducers, Selectors and State folders.

```
npm install --save @ngrx/store @ngrx/core @ngrx/effects @ngrx/store-devtools @ngrx/router-store
```

### Example

```javascript
//store/reducer.ts
import { CartActionTypes, CartActions } from "./actions";

export let cartState = [];

export function Reducer(state = cartState, action: CartActions) {
    switch (action.type) {
        case CartActionTypes.ADD_PRODUCT:
            return [...state, action.payload];

        case CartActionTypes.REMOVE_PRODUCT:
            let product = action.payload;
            return state.filter((el) => el.id != product.id);

        case CartActionTypes.UPDATE_PRODUCT:
            let product = state[action.payload.index];
            const updatedProduct = {
                ...product,
                ...action.payload,
            };

            const updatedProducts = [state];
            updatedProducts[action.payload.index] = updatedProduct;

            return {
                ...state,
                updatedProducts,
            };

        default:
            return state;
    }
}
```

```js
// app.module.ts
// initializing the store

imports: [StoreModule.forRoot({ cart: Reducer })];
```

```js
// app.component.ts
// access states from store using select()

export class AppComponent {
  cart: Observable<any[]>;

  constructor(private store: Store<any>) {}

  onAddProduct() {
    this.store.dispatch(new actions.AddProduct());
  }

  ngOnInit() {
    // select slice of state
    this.store.select('cart').subscribe((state) => this.cart = state))

    // or this.cart$ = this.store.select('cart')
  }
}
```

```js
// store/actions.ts

import { Action } from '@ngrx/store';

export enum CartActionTypes {
    ADD_PRODUCT = 'ADD_PRODUCT',
    REMOVE_PRODUCT = 'REMOVE_PRODUCT'
    UPDATE_PRODUCT = 'UPDATE_PRODUCT'
}

export class AddProduct implements Action {
    readonly type = CartActionTypes.ADD_PRODUCT
    constructor(public payload: any) {}
}

export class RemoveProduct implements Action {
    readonly type = CartActionTypes.REMOVE_PRODUCT
    constructor(public payload: any) {}
}

export type CartActions = AddProduct | RemoveProduct
```
