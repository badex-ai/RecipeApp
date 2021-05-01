import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  user: User;
  inventoryStat;
  editedid:number;
  historyClick: boolean;
  editMode:Boolean= false ;
  constructor(private shoppingListService: ShoppingListService,private authService: AuthService) { }

  ngOnInit(){
  
    this.authService.user.subscribe(value=>{
      this.user= value
    })
    this.ingredients = this.shoppingListService.getIngredients();
    //console.log(this.ingredients)

          this.shoppingListService.getInventory(this.user.userId).subscribe(
          value=>{
            //console.log(value);
            this.inventoryStat = value }
        )

    this.shoppingListService.editMode.subscribe((editmode: boolean)=>{
      this.editMode= editmode
    })


    this.shoppingListService.ingredientsHasChanged.subscribe((ingredients:Ingredient[])=>{
      this.ingredients  =ingredients;
      //console.log(ingredients)
    })

    this.shoppingListService.historyClicked.subscribe(value=>{
      this.historyClick = value;
      //console.log(value)
    }
      
    )
    
   // //console.log(this.ingredients)
  }

 

  onEditIng(id:number){
    this.shoppingListService.editMode.next(true)
    this.editedid= id;
    this.shoppingListService.editedIngredientIndex.next(id);
    
    
  }
  onDeleteIng(id:number){
    this.shoppingListService.deleteIngredient(id);
    

  }
  getInventoryIngredients(){
   this.inventoryStat = this.shoppingListService.getInventory(this.user.userId);
   //console.log(this.inventoryStat)
   
  }
  saveIngredientList(){

  }
}
