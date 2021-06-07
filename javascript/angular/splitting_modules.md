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
  ReactiveFormsModule
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
