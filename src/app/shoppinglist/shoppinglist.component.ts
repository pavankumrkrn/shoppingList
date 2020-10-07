import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit, OnDestroy {
  ingredients:Ingredient[];
  private sub: Subscription;
  constructor(private slService: ShoppingListService) { }

  editItem(index: number){
    this.slService.startedEditing.next(index);
  }
  ngOnInit(): void {
    this.ingredients  = this.slService.getIngredient();
    this.sub = this.slService.ingredientsAdded.subscribe(
      (ingredient: Ingredient[])=>{
        this.ingredients = ingredient;
      }
    )
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
