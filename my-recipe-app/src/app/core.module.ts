import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RecipeService } from "./recipes/recipe.service";
import { AuthInterceptorService } from "./shared/auth-interceptor.service";
import { ShoppingListService } from "./shopping-list/shopping-list.service";



@NgModule({
  providers: [
    ShoppingListService,//any service you plan on being injected needs to be provided. also a new a way to do this directly in the ts file @Injectable({providedIn: 'root'})
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true//to allow mulitple interceptors
    }
  ]
})
export class CoreModule { }
