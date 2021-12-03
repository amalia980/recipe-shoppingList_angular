import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { RecipesModule } from './shared/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

const appRoutes: Routes = [
  { path: 'recipes', component: RecipesComponent },
  { path: 'shopping-list', component: ShoppingListComponent }

];

@NgModule({
  declarations: [//the class name elements
    AppComponent,
    HeaderComponent,
    AuthComponent,
  ],
  imports: [//let us import other modules
    BrowserModule,
    AppRoutingModule,//our created module
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecipesModule,
    ShoppingListModule,
    SharedModule,
    CoreModule//the services
  ],

  bootstrap: [AppComponent],//is not bootstrap styling. it defines which components is available right in that index.html file. typically there is one component. so this is the root component <app-root></app-root> in index.html
})
export class AppModule { }
