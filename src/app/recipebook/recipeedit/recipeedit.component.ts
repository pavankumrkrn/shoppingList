import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeBookService } from '../recipebook.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipeedit',
  templateUrl: './recipeedit.component.html',
  styleUrls: ['./recipeedit.component.css']
})
export class RecipeeditComponent implements OnInit {
  recipe: Recipe;
  id: number;
  recipeForm: FormGroup;
  editMode:boolean = false;
  constructor(private route: ActivatedRoute, private recipeBookService: RecipeBookService,
    private router: Router) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(
      (pms: Params)=>{
        this.id = +pms['id'];
        this.editMode = pms['id'] != null;
        this.initForm();
      }
    )
  }

  private initForm(){
    let recipeName = '';
    let imgPath = '';
    let desc = '';
    let recipeIngredients = new FormArray([]);
    if(this.editMode){
      const recipe1 = this.recipeBookService.getRecipeByindex(this.id);
      recipeName = recipe1.name;
      imgPath = recipe1.imagePath;
      desc = recipe1.description;
      if(recipe1['ingredient']){
        for(let ing of recipe1.ingredient){
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ing.name, Validators.required),
              'amount' : new FormControl(ing.amount,  [Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(imgPath, Validators.required),
      'description' : new FormControl(desc, Validators.required),
      'ingredients' : recipeIngredients
    });
  }

  submitForm(){
    if(this.editMode){
      this.recipeBookService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeBookService.addRecipe(this.recipeForm.value);
    }
  }

  addIngredient(){
(<FormArray>this.recipeForm.get('ingredients')).push(
  new FormGroup({
    'name' : new FormControl(null, Validators.required),
    'amount' : new FormControl(null, [Validators.required,
    Validators.pattern(/^[1-9]+[0-9]*$/)])
  })
)
  }

  onCancel(){
    this.router.navigate(['../'], {
      relativeTo: this.route
    })
  }

}
