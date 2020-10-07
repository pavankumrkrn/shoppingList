import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeBookService } from './recipebook.service';

@Injectable({providedIn : 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorage: DataStorageService, private recipeService: RecipeBookService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        const recipe = this.recipeService.getRecipes();
        if(recipe.length === 0){
           return this.dataStorage.fetchdata();
        }
        else{
            return recipe;
        }
    }

}