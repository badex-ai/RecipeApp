import { Component, Input, OnInit } from '@angular/core';
//import { RouterLink } from '@angular/router';
import { Instruction } from 'src/app/shared/Instruction.model';
import { Recipe } from '../recipe.model';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipes-procedure',
  templateUrl: './recipes-procedure.component.html',
  styleUrls: ['./recipes-procedure.component.scss']
})
export class RecipesProcedureComponent implements OnInit {
  @Input('rcvRecipe') recipe:Recipe;
  
  
  

  constructor(private recipeService: RecipeService) { }

  ngOnInit(){
   // console.log(this.recipe)
  }
 onCloseInst(){
   this.recipeService.expand.next({state: false})
 }
}
