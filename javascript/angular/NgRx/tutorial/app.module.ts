// app.module.ts:

// tells NgRx where to find reducer
imports: [      
  StoreModule.forRoot(fromApp.appReducer),
  EffectsModule.forRoot([AuthEffects]);
] 


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

```javascript
// app.reducer.ts:
import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromSHoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};
