```javascript
// app.module.ts:

// tells NgRx where to find reducer
imports: [      
  StoreModule.forRoot(fromApp.appReducer),
  EffectsModule.forRoot([AuthEffects]);
] 
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

```

```javascript
//auth.effects.ts:
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as AuthActions from './auth/actions';

@Injectable() // to inject items into effect from constructor

export class AuthEffects {
  @Effect()   // to turn class into an effect
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START)  // to filter type of effects you want
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post('http://example.com, {username: authData.payload.email, password: authData.payload.password})
    }).pipe(
      map(resData => {
        return new AuthActions.Login({username: resData.username, password: resData.password))
      }
      )),
      catchError(errRes => {
        let errorMsg = 'An unknown error occured';
        if(!errorRes.error) || !errorRes.error.error) 
        ...
        
        return of(new AuthActions.LoginFail(errorMessage));
      });
  );
  
  @Effect({dispatch: false})  // inform NgRx this effect will not yield a dispatchable action
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(['/']); 
    })
  )
  
  
  constructor(private actions$: Actions, private http: HttpClient, router: Router) {} // $ indicates observable
}


```
