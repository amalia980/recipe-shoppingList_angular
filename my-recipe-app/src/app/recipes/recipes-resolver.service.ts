//fix the error when reloading page. with a Guard(Resolver)

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>//we have to define what type of data it will resolve
 {
   constructor(private dataStorageService: DataStorageService, private recipesService: RecipeService) { }

   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     const recipes = this.recipesService.getRecipes();
      if (recipes.length === 0) {//if this is true it means we have no recipes and we should fetch them
        return this.dataStorageService.fetchRecipes();
      } else {//or else we can just return these recipes instead
        return recipes;
      }
   }
}
