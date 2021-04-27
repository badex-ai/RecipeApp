import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import {Recipe} from './recipe.model';
import {RecipeService} from './recipe.service';


@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private recipesService: RecipeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    // const recipes = this.recipesService.setRecipes();
    // if (recipes.length === 0) {
    //   return this.dataStorageService.fetchRecipes();
    // } else {
    //   return recipes;
    // }
    
    // var connectedRef = firebase.database().ref(".info/connected");
    // connectedRef.on("value", (snap) => {
    //   if (snap.val() === true) {
    //     console.log("connected");
    //   } else {
    //     console.log("not connected");
    //   }
    // });

    throw new Error('Method not implemented.');
  }
}
