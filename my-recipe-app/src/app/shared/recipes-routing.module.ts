import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { RecipeDetailComponent } from "../recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "../recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "../recipes/recipe-start/recipe-start.component";
import { RecipeResolverService } from "../recipes/recipes-resolver.service";
import { RecipesComponent } from "../recipes/recipes.component";

const routes: Routes = [
  {
    path: 'recipes', component: RecipesComponent,
    canActivate: [AuthGuard],//protection. cannot access the page in any way without login
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent},
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolverService]
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],//forChild generates the routing automatically
  exports: [RouterModule]

})
export class RecipesRoutingModule { }
