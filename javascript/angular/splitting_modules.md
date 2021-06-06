## Splitting Modules:
Modules are standalone i.e. do not interact with each other. Needed for performance improvement.
```javascript
// recipe.module.ts
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListcomponent
  ]
  exports: [
    RecipesComponent,
    RecipeListcomponent
  ]
})

export class RecipesModule

// app.module.ts
imports: [
  RecipesModule
]
```
