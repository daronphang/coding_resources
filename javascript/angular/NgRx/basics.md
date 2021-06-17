## Redux vs NgRx:
Library with state management pattern that stores states in central store. When changing states, services/components will dispatch actions where updated states are sent to 
Reducers which will reduce/combine state. State changes must always be immutable i.e. cannot edit existing/previous state. NgRx is a Redux version for Angular. 

```
npm install --save @ngrx/store
```
```javascript
// example.reducer.ts
import { Action } from '@ngrx/store';

const initialState = {
  ingredients: ['apples', 'oranges']
}

export function shoppingListReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return {
        ...state,   // copying existing state
        ingredients: [...state.ingredients, action]    // overwriting ingredients state
      }
  }
}
```
