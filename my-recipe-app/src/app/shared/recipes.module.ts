import { NgModule } from "@angular/core";

import { RecipesComponent } from "../recipes/recipes.component";
import { RecipeListComponent } from "../recipes/recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "../recipes/recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "../recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "../recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "../recipes/recipe-edit/recipe-edit.component";


@NgModule({
  declarations: [//put all recipes components in here
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  exports: [//now we can use all these components in our other modules that imports the recipe module
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ]
})
export class RecipesModule { }
