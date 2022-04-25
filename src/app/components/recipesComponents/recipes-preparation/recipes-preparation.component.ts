import { Component, Input, OnInit } from '@angular/core';
//import { RouterLink } from '@angular/router';
import { Instruction } from 'src/app/shared/Instruction.model';
import { Recipe } from '../../../recipes/recipe.model';
import {RecipeService} from '../../../recipes/recipe.service';

@Component({
  selector: 'app-recipes-preparation',
  templateUrl: './recipes-preparation.component.html',
  styleUrls: ['./recipes-preparation.component.scss']
})
export class RecipesPreparationComponent implements OnInit {
  @Input('rcvRecipe') recipe:Recipe;
  
  
  

  constructor(private recipeService: RecipeService) { }

  ngOnInit(){
   // console.log(this.recipe)
  }
 onCloseInst(){
   this.recipeService.expand.next({state: false})
 }
}
