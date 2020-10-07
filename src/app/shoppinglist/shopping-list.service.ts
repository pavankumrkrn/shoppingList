import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
export class ShoppingListService {

    startedEditing = new Subject<number>();
    ingredientsAdded = new Subject<Ingredient[]>();

    private ingredients:Ingredient[] = [
        new Ingredient('Chicken', 2),
        new Ingredient('Spring onions', 10)
      ];

      getIngredient(){
          return this.ingredients.slice();
      }

      getIngredientByIndex(index){
          return this.ingredients[index];
      }

      addIngredient(ingredient: Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientsAdded.next(this.ingredients.slice());
      }

      addIngFromDetail(ingredient: Ingredient[]){
          this.ingredients.push(...ingredient);
          this.ingredientsAdded.next(this.ingredients.slice());
      }

      updateIngredient(index: number, newIngredient: Ingredient){
          this.ingredients[index] = newIngredient;
          this.ingredientsAdded.next(this.ingredients.slice());
      }

      delIngredient(index: number){
          this.ingredients.splice(index, 1);
          this.ingredientsAdded.next(this.ingredients.slice());
      }
}