## Basics:
Library with state management pattern that stores states in central store i.e. centralized place to make changes. When changing states, services/components will dispatch actions where updated states are sent to Reducers which will reduce/combine state. State changes must always be immutable i.e. cannot edit existing/previous state. NgRx is a Redux version for Angular. 

Flow: Components/Services -> dispatch actions -> Reducers return new state to Store -> State is updated in component through selectors.

Main purpose of redux pattern is to provide a predictable state container based on three principles:
1) Single source of truth i.e. state of whole application is stored in an object tree within a single store.
2) State is read-only/immutable; actions are dispatched instead i.e. getting, adding, removing, updating state.
3) Changes are made with pure functions through Reducer function which returns a new state object.  

### Actions:
Have two properties:
1) type: read only string describing what the action stand for.
2) payload: the data sent to the Reducer (not all actions need a payload).

### Reducers:
Pure functions accepting two arguments, previous State and Action. When an Action is dispatched, NgRx goes through all reducers in the order the Reducers were created until it finds a case for that Action. 

### Effects:
If an Effect gets triggered by dispatching an Action, this means side effects are going to happen before calling the Reducer i.e. http requests. Effects listen if any Action is dispatched and checks if it has a a case for Action type. After performing side effect, emits another Action referring to the result-state of side effect (success/error), and Reducer finally enters the scene.

### Selectors: 
NgRx provides select() to obtain slices of object tree from Store which accepts selector function as argument. It is a function that allows some logic to be applied to the slice before using the data in components.

### Store:
An object that holds application state and brings Actions, Reducers and Selectors together i.e. when an action is dispatched, the store finds and executes the appropriate Reducer.


```
npm install --save @ngrx/store @ngrx/core @ngrx/effects @ngrx/store-devtools @ngrx/router-store
```

```javascript
// app.module.ts:

imports: [StoreModule.forRoot({shoppingList: shoppingListReducer})] // tells NgRx where to find reducer
```

```javascript
// shopping-list.reducer.ts
// store both files in store folder
import { Action } from '@ngrx/store';
import { ADD_INGREDIENT } from './shopping-list.actions';
import * as ShoppingListActions from './shopping-list.actions'; 

const initialState = {
  ingredients: ['apples', 'oranges']
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,   // copying existing state
        ingredients: [...state.ingredients, action.payload]    // overwriting ingredients state
      };
      
    default: 
      return state;
  }
}
```

```javascript
// shopping-list.actions.ts
import { Action } from '@ngrx/store';
import { Ingredient } from './shared/ingredient.model';


export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  
  constructor(public payload: Ingredient) {}
}

```

```javascript
// shopping-list.component.ts:

export class ShoppingListComponent implements OnInit {
  constructor(private store: Store<shoppingList: {ingredients: Ingredient[]}}> ) {}  // type is key chosen in app-module
  
  ingredients: Observable<{ingredients: Ingredient[] }>
  
  ngOnInit() {
    this.ingredients = this.store.select('shoppingList')
  }
}


```

```javascript
// shopping-edit.component.ts:
import * as ShoppingListActions from './shopping-list.actions'; 

onSubmit(form: NgForm) {
  this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));    // dispatch actions
}


```

```html
<li *ngFor="let ingredient of (ingredients | async).ingredients" >
```
