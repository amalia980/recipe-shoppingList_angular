import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import { RecipesComponent } from "./recipes.component";

@Injectable()


export class RecipeService {
  //recipeSelected = new Subject<Recipe>();

  recipesChanged = new Subject<Recipe[]>();

  //below is the default recipes. they wont be needed though

  //   private recipes: Recipe[] =  [//overrided this array, of recipes when fetching. below
  //   new Recipe('Lasagna', 'A classic baked lasagna', 'https://images.unsplash.com/photo-1619895092538-128341789043?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80', [
  //     new Ingredient('Meat', 1),
  //     new Ingredient('Cheese', 4)
  //   ]),
  //   new Recipe('Hamburger with Fries', 'Juicy burger with crispy fries', 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80', [
  //     new Ingredient('Buns', 2),
  //     new Ingredient('Fries', 25)
  //   ])
  // ];

  private recipes: Recipe[] = [];//array of recipes that is empty by default for users to type in their own that will be stored in this

  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {//overriding the Recipe[] thats array on top
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
