import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeBookService } from '../recipebook.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipedetail',
  templateUrl: './recipedetail.component.html',
  styleUrls: ['./recipedetail.component.css']
})
export class RecipedetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private recipeBookService: RecipeBookService,
     private route: ActivatedRoute,
     private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (pms: Params)=>{
      this.id = +pms['id'];
      this.recipe = this.recipeBookService.getRecipeByindex(this.id);
    }
    );
  }

  addToShpList(){
    this.recipeBookService.addIngToShpList(this.recipe.ingredient);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  deleteRecipe(){
    this.recipeBookService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
