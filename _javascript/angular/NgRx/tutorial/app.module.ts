// app.module.ts:

// tells NgRx where to find reducer
imports: [      
  StoreModule.forRoot(fromApp.appReducer),
  EffectsModule.forRoot([AuthEffects]);
] 



```html
<li *ngFor="let ingredient of (ingredients | async).ingredients" >
```



