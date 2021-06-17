## Redux vs NgRx:
Library with state management pattern that stores states in central store. When changing states, services/components will dispatch actions where updated states are sent to 
Reducers which will reduce/combine state. State changes must always be immutable i.e. cannot edit existing/previous state. NgRx is a Redux version for Angular. 

```
npm install --save @ngrx/store
```
```javascript
// shopping-list.reducer.ts
// store both files in store folder
import { Action } from '@ngrx/store';
import { ADD_INGREDIENT } from './shopping-list.actions';

const initialState = {
  ingredients: ['apples', 'oranges']
}

export function shoppingListReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,   // copying existing state
        ingredients: [...state.ingredients, action]    // overwriting ingredients state
      }
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
  payload: Ingredient;
}

```
