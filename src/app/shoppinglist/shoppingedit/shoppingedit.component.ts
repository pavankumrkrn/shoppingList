import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shoppingedit',
  templateUrl: './shoppingedit.component.html',
  styleUrls: ['./shoppingedit.component.css']
})
export class ShoppingeditComponent implements OnInit, OnDestroy {
  @ViewChild('formData',{static: false}) fromData: NgForm;
  private sub: Subscription;
  editMode = false;
  editedItemIndex: number;
  editIngredient: Ingredient;
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.sub = this.slService.startedEditing.subscribe(
      (index: number)=>{
        this.editedItemIndex = index;
        this.editMode = true;
        this.editIngredient = this.slService.getIngredientByIndex(index);
        this.fromData.setValue({
          name: this.editIngredient.name,
          amount: this.editIngredient.amount
        })
      }
    )
  }

  addIngredient(formData: NgForm){
    const form = formData.value
    const ing = new Ingredient(form.name, form.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, ing);
    } else{
      this.slService.addIngredient(ing);
    }
    this.editMode = false;
    formData.reset();
  }

  clearForm(){
    this.editMode = false;
    this.fromData.reset();
  }

  deleteIngredient(){
    this.slService.delIngredient(this.editedItemIndex);
    this.clearForm();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
