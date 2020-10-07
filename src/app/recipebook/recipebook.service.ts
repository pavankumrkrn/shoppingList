import { Recipe } from './recipe.model';

import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist/shopping-list.service';
import { Subject } from 'rxjs';
@Injectable()
export class RecipeBookService {

    recipesChanged = new Subject<Recipe[]>();

    constructor(private slService: ShoppingListService){}
    private recipes:Recipe[] = [
        new Recipe("Thukpa", 
        "Chicken noodle soup", 
        "https://img-global.cpcdn.com/recipes/0f2ffd82ebc37c27/1200x630cq70/photo.jpg",
        [new Ingredient("Chicken", 2), new Ingredient("Plain Noodles", 5)]),
        // new Recipe("KFC chicken",
        //  "Chicken Fry",
        //  "https://i2.wp.com/www.eatthis.com/wp-content/uploads//media/images/ext/966368714/kfc-original-chicken-recipe.jpg?resize=640%2C360&ssl=1",
        //  [new Ingredient("Corn Flour", 5), new Ingredient("Chicken Leg", 6)])
        
        ];

      getRecipes(){
          return this.recipes.slice();
      }

      getRecipeByindex(index: number){
          return this.recipes[index];
      }

      setRecipes(recipe: Recipe[]){
          this.recipes = recipe;
          this.recipesChanged.next(this.recipes.slice());
      }

      addIngToShpList(ingredient: Ingredient[]){
          this.slService.addIngFromDetail(ingredient);
      }

      addRecipe(recipe: Recipe){
          this.recipes.push(recipe);
          this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
          this.recipes[index] = newRecipe;
          this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice());
      }
} 