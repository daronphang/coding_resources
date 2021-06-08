## Splitting Modules:
Modules are standalone i.e. do not interact with each other. Needed for performance improvement.
```javascript
// recipe.module.ts
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListcomponent
  ],
  exports: [
    RecipesComponent,
    RecipeListcomponent
  ], 
  imports: [
  RouterModule.forChild({path: 'recipes', component: RecipesComponent, canActivate: [AuthGuard}),
  SharedModule,
  ReactiveFormsModule,
  CoreModule
  ]
})

export class RecipesModule

// app.module.ts
imports: [
  RecipesModule,
  SharedModule
]
```
## Shared Modules:
Important key to take note is that Components can only be declared once but can be imported multiple times.
```javascript
// shared.module.ts
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [         // shared components
    AlertComponent,
    LoadingSpinnerComponent
  ],
  exports: [
    AlertComponent,
    LoadingSpinnercomponent,
    CommonModule
  ], 
  imports: [
  CommonModule
  ]
})
```
## Core Module:
Used to store all services. However, recommended way is to provide services @Injectable at component level.
```javascript
@NgMoule({
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
```
