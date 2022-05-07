import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ShoppingListService} from '../shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { Store } from '@ngrx/store';
import * as ShoppingListAction from '../store/shopping-list.actions'


@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {
  user: User;
  editMode: Boolean;
  ingredientIndex: number;
  shopListForm: FormGroup;
  ingredientToEdit: Ingredient;
  historyClicked: boolean = false;

  constructor(private shoppingListService :ShoppingListService, private authService: AuthService,
   private store: Store<{shoppingList:{ingredients: Ingredient[]}}> 
   ) { }

initForm(){

}

  ngOnInit() {
    // this.shoppingListService.historyClicked.subscribe(value=>{
    //   this.historyClicked= value;

    // })
    this.authService.user.subscribe(value=>{
      this.user= value;
    })
    this.shoppingListService.editMode.subscribe((editmode)=>{
      this.editMode = editmode
    });
    this.shoppingListService.editedIngredientIndex.subscribe((index: number)=>{
    
      
     
      this.ingredientIndex = index;
      this.ingredientToEdit = this.shoppingListService.getIngredientToEdit(index);
     
      //this.editMode= this.ingredientToEdit.name !== null

      if(this.editMode){

        
        this.shopListForm = new FormGroup({
          'name': new FormControl(this.ingredientToEdit.name, [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]+$/)]),
          'quantity': new FormControl(this.ingredientToEdit.quantity, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
          'symbol': new FormControl(this.ingredientToEdit.symbol, Validators.required)
         }
          
          )
      }
      
    })
    
    this.shopListForm = new FormGroup({
      'name': new FormControl(null,[Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z ]+[a-zA-Z]+$/)] ),
      'quantity': new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'symbol': new FormControl("kg",Validators.required) 
      
    })
  }

  onAddIngredientToList(){
   // //console.log(this.editMode);
  // this.shopListForm.value.name=  this.shopListForm.value.name.toLowerCase();
   //console.log(this.shopListForm.value);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.ingredientIndex,this.shopListForm.value)
    }else{
      this.shoppingListService.addIngredient(this.shopListForm.value);
    }
    
    this.shopListForm.reset();
    this.shopListForm.patchValue({
      'symbol': "kg"
    })
    //this.shopListForm.patchValue()
    //console.log(this.shopListForm.value)
  } 

  // this.store.dispatch(new ShoppingListAction.AddIngredient(this.ingredientIndex,this.shopListForm.value)

  onCancelEdit(){
    this.editMode= !this.editMode;
    this.shopListForm.reset();
    this.shoppingListService.editMode.next(false)
    //this.shopListForm.value.symbol.setValue('kg')
  }

  onClickHistory(){
    this.historyClicked= !this.historyClicked;
    this.shoppingListService.historyClicked.next(this.historyClicked);
  }
  onClickSave(){
    
      this.shoppingListService.addIngredientsToInventory(this.user.userId);
      // this.alertService.alert.next(true);
      // this.alertService.message.next('Saved to Inventory')
      
       
  }
  onClearForm(){
    this.shoppingListService.clearIngredients()
  }
}
