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