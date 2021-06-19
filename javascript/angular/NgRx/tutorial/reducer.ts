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
