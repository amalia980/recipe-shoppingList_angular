import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

/*
const appRoutes: Routes = [
  { path: 'recipes', component: RecipesComponent },
  { path: 'shopping-list', component: ShoppingListComponent }

];
*/
@NgModule({
  declarations: [//the class name elements
    AppComponent,
    HeaderComponent,
  ],
  imports: [//let us import other modules
    BrowserModule,
    AppRoutingModule,//our created module
    HttpClientModule,
    SharedModule,
    CoreModule//the services
  ],

  bootstrap: [AppComponent],//is not bootstrap styling. it defines which components is available right in that index.html file. typically there is one component. so this is the root component <app-root></app-root> in index.html
})
export class AppModule { }
