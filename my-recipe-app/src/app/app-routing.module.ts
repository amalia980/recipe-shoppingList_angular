import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthModule } from "./recipes/auth.module";

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },

  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(s => s.ShoppingListModule)},

  { path: 'auth', loadChildren: () => import('./recipes/auth.module').then(a => a.AuthModule) }
];

@NgModule({//app routing module imports the router module that angular offers.
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]//export the routerModule from the app routing module so its not only avaible in this module but also in the app routing module

})

export class AppRoutingModule {

}
