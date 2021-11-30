//http requests handling

import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth.service";

@Injectable({providedIn: 'root'})//this is an option for instead implementing in the providers of app.module.ts

export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,//injecting RecipeService to get the recipes directly from there
    private authService: AuthService
    ) { }

  //saving the recipes to be able to fetch them later
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    //http request
    this.http.put(//use put to get all the recipes. with post you would get 1
      'https://recipe-and-shopping-list-app-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes).subscribe(//we can subscribe inside here because and not in the recipes component, we are not interested in if that request is done or not

      response => {
        console.log(response);
      }
      );
  }

  fetchRecipes() {

      //we will will specify with <> what format the extracted response body will have, which is an "array" of recipes
      return this.http
    .get<Recipe[]>(
      'https://recipe-and-shopping-list-app-default-rtdb.europe-west1.firebasedatabase.app/recipes.json' //get the data from the previous observable. here we return a new observable

      ).pipe( /*protection against errors of ingredients with pipe*/
    map(recipes => {//this "map" is an rxjs operator
    return recipes.map(recipe => {//this map is not the same function as the top. recipes are calling the array. so this "map" is just a normal JS method

      return {
        ...recipe,
        ingredients: recipe.ingredients ? recipe.ingredients : []
      };//return the transformed recipe or an empty array if the ingredients are "true"
    });
  }),
  tap(recipes => {
        this.recipeService.setRecipes(recipes);
  })
  );

  }

}
