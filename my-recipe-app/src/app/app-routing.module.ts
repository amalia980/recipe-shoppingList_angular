import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},

  { path: 'auth', component: AuthComponent}
];

@NgModule({//app routing module imports the router module that angular offers.
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]//export the routerModule from the app routing module so its not only avaible in this module but also in the app routing module

})

export class AppRoutingModule {

}
