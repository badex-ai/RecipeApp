import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShoppingListComponent} from '../app/shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { AuthComponent } from './auth/auth.component';
import { RecipesDefaultDetailComponent } from './components/recipesComponents/recipes-default-detail/recipes-default-detail.component';
import { RecipesDetailComponent } from './components/recipesComponents/recipes-detail/recipes-detail.component';
import { RecipesEditComponent } from './components/recipesComponents/recipes-edit/recipes-edit.component';
import { RecipeGuard } from './recipe.guard';
import {SettingsGuard} from './components/settings/settings.guard';
import { RecipeComponent } from './components/recipesComponents/recipe/recipe.component';
import { SettingsComponent } from './components/settings/settings.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
//import { LikedRecipesComponent } from './liked-recipes/liked-recipes.component';
//import { LikedRecipesDetailComponent } from './liked-recipes/liked-recipes-detail/liked-recipes-detail.component';


const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},


  {path: 'recipes', canDeactivate:[RecipeGuard], canActivate: [RecipeGuard],component: RecipesComponent, children:[
    {path: '', pathMatch: 'full', component: RecipesDefaultDetailComponent},
    {path: 'new', component:RecipesEditComponent},
    
    {path:':id', component: RecipesDetailComponent},
    {path:':id/edit', component: RecipesEditComponent}
  ]},



  {path: 'liked-recipes', canDeactivate:[RecipeGuard], component: RecipesComponent, children:[
    {path: '', pathMatch: 'full', component: RecipesDefaultDetailComponent},
    {path:':id', component: RecipesDetailComponent}
    
  ]},



  {path: 'shopping-list', component: ShoppingListComponent },


  {path: 'login', component: AuthComponent},


  {path: 'settings', canDeactivate:[SettingsGuard], component: SettingsComponent},

  {path: 'recipe', children:[
   {path: ':name',component: RecipeComponent} 
  ]}

  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
