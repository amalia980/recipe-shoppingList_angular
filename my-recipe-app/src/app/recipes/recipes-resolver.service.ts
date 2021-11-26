//fix the error when reloading page. with a Guard(Resolver)

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>//we have to define what type of data it will resolve
 {
   constructor(private dataStorageService: DataStorageService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.dataStorageService.fetchRecipes();
   }
}
