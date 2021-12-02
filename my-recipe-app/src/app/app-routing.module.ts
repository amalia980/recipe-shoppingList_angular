import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import { AuthGuard } from "./auth.guard";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeResolverService } from "./recipes/recipes-resolver.service";

import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
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
  },
  { path: 'shopping-list', component: ShoppingListComponent},
  { path: 'auth', component: AuthComponent}
];

@NgModule({//app routing module imports the router module that angular offers.
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]//export the routerModule from the app routing module so its not only avaible in this module but also in the app routing module

})

export class AppRoutingModule {

}
