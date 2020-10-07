import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeBookService } from '../recipebook.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipelist',
  templateUrl: './recipelist.component.html',
  styleUrls: ['./recipelist.component.css']
})
export class RecipelistComponent implements OnInit {
  recipes:Recipe[];
  constructor(private recipeBookService: RecipeBookService, 
    private router: Router,
    private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.recipeBookService.recipesChanged.subscribe(
      (recipeCh : Recipe[])=>{
        this.recipes = recipeCh;
      }
    );
    this.recipes = this.recipeBookService.getRecipes();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }

}
