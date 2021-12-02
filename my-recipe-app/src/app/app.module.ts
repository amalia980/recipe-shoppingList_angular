import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from './recipes/recipe.service';
import { AuthComponent } from './auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './shared/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceHolderDirective } from './shared/placeholder/placeholder.directive';
import { RecipesModule } from './shared/recipes.module';

const appRoutes: Routes = [
  { path: 'recipes', component: RecipesComponent },
  { path: 'shopping-list', component: ShoppingListComponent }

];

@NgModule({
  declarations: [//the class name elements
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceHolderDirective
  ],
  imports: [//let us import other modules
    BrowserModule,
    AppRoutingModule,//our created module
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecipesModule
  ],
  providers: [//any service you plan on being injected needs to be provided. also a new a way to do this directly in the ts file @Injectable({providedIn: 'root'})
    ShoppingListService,
    RecipeService,

  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true//to allow mulitple interceptors
  }
],
  bootstrap: [AppComponent],//is not bootstrap styling. it defines which components is available right in that index.html file. typically there is one component. so this is the root component <app-root></app-root> in index.html

  entryComponents: []//you wont need this for version angular 9 or higher. the entry components will emit by default
})
export class AppModule { }
