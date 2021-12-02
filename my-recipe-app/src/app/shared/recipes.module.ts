import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";


import { RecipesComponent } from "../recipes/recipes.component";
import { RecipeListComponent } from "../recipes/recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "../recipes/recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "../recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeStartComponent } from "../recipes/recipe-start/recipe-start.component";
import { RecipeEditComponent } from "../recipes/recipe-edit/recipe-edit.component";
import { RecipesRoutingModule } from "./recipes-routing.module";


@NgModule({
  declarations: [//put all recipes components in here
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    RouterModule,
    CommonModule,//get access to *ngFor and *ngIf
    ReactiveFormsModule,
    RecipesRoutingModule
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
