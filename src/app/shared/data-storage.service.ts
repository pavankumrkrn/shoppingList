import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeBookService } from '../recipebook/recipebook.service';
import { Recipe } from '../recipebook/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn :"root"})
export class DataStorageService { 

    constructor(private http: HttpClient, private recipeBookService: RecipeBookService, private authservice: AuthService){}

    savedata(){
        const recipes = this.recipeBookService.getRecipes();
        return this.http.post('https://shoppinglist-38d34.firebaseio.com/recipe.json',recipes)
        .subscribe(response=>{
            console.log(response);
        })
    }

    fetchdata(){
     
            // return this.http.get<Recipe[]>('https://shoppinglist-38d34.firebaseio.com/recipe.json')
            // .pipe( map(recipes=>{
            //     recipes.map(recipe=>{
            //        return {...recipe, ingredient: recipe.ingredient ? recipe.ingredient : []}
            //    }),
            //    tap(recipe=>{
            //       this.recipeBookService.setRecipes(recipe);
            //    })
            //    );
            //    );
        

        
    }
}