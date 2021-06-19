// app.module.ts:

// tells NgRx where to find reducer
imports: [      
  StoreModule.forRoot(fromApp.appReducer),
  EffectsModule.forRoot([AuthEffects]);
] 



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
