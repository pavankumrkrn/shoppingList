import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipebookComponent } from './recipebook/recipebook.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { RecipestartComponent } from './recipebook/recipestart/recipestart.component';
import { RecipedetailComponent } from './recipebook/recipedetail/recipedetail.component';
import { RecipeeditComponent } from './recipebook/recipeedit/recipeedit.component';
import { RecipeResolverService } from './recipebook/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  {path:"", redirectTo: '/recipes', pathMatch:'full'},
  {path:"recipes", component : RecipebookComponent, children:[
    {path:"", component : RecipestartComponent},
    {path:"new", component : RecipeeditComponent},
    {path:":id", component: RecipedetailComponent, resolve : [RecipeResolverService]},
    {path:":id/edit", component: RecipeeditComponent}
  ]},
  {path:"shopping-list", component: ShoppinglistComponent},
  {path:"auth", component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
