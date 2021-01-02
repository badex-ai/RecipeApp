import { Injectable } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {BehaviorSubject, Subject} from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AlertService} from '../shared/alert/alert.service'; 
//import {AngularFire}

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredients: Ingredient[]= [];
  //  [
  //   new Ingredient('Rice',"25",'kg'),
  //   new Ingredient('Beans',"10",'lb'),
  //   new Ingredient('Plantain',"5",'unit'),
  // ];
  inventoryCollection: AngularFirestoreCollection<any>;
  inventory;
  
   
  editedIngredientIndex = new Subject<number>();
  ingredientsHasChanged = new Subject<Ingredient[]>();
  historyClicked = new Subject<boolean>();
  // map = new HashMap<>();
  editMode = new BehaviorSubject<boolean>(null);
  constructor(private firestore: AngularFirestore, private alertService: AlertService) {
    this.inventoryCollection = this.firestore.collection('Inventory')
   }
  
  getIngredients(){
    //console.log(this.ingredients);
    return this.ingredients.slice();
    
  }

  addIngredient(...ingredient: Ingredient[]){
    ingredient.forEach((ingredient=>{
      console.log(ingredient);
      ingredient.name= ingredient.name.toLowerCase();
    }))
    
    
    if(this.ingredients.length > 0){
      let found: boolean;
      for(let ingrid of ingredient){
      //  console.log("looping 1");
        for( let listIngredient of this.ingredients){
        //  console.log('looping 2');
        //  console.log(ingrid.name);
        //  console.log(listIngredient.name);
          if(listIngredient.name == ingrid.name && listIngredient.symbol == ingrid.symbol){
            console.log(true);
            let sample = {...ingrid};
            console.log(sample);
            let gege = {...listIngredient};
          // console.log(gege);
            let result= parseInt(gege.quantity) + parseInt(sample.quantity); 
          //  console.log(result);
            let index = this.ingredients.indexOf(listIngredient);
          //  console.log(index);
          //  console.log(this.ingredients);
            this.ingredients.splice(index,1);
             listIngredient.quantity =  `${result}`;
             this.ingredients.unshift(listIngredient)
             found= true;
            
          }
          
          
         // console.log(listIngredient)
        }
        
      }

      if(!found){
        this.ingredients.unshift(...ingredient)
      }
      

     
    }
    else{ 
      this.ingredients.unshift(...ingredient);
    }
    console.log(ingredient)
   // this.ingredients.unshift(...ingredient);
    console.log(this.ingredients);
    this.ingredientsHasChanged.next(this.ingredients.slice())
  }

  getInventory(userId: string){
  //  this.recipe = this.recipesCollection.doc<Recipe>(id).valueChanges()
  //this.firestore.collection("Inventory").ref()
    console.log(userId);
  this.inventory = this.firestore.collection("Inventory", ref => ref.where("user", "==", `${userId}`)).valueChanges()
  console.log(this.inventory)
   return this.inventory
  }
  
  addIngredientsToInventory(userId: string){
    let today = new Date(Date.now())
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    console.log(this.ingredients)

    if(this.ingredients.length > 0){
     let invent = this.inventoryCollection.add({
        date: `${date}`,
        ingredients: this.ingredients,
        user: userId
        } 
        )
        .then(()=>{
            this.alertService.alert.next(true);
            this.alertService.message.next('Saved to Inventory')
        }
        
         
          
        )
        .catch(this.errorHandler)
      //  console.log(invent);
        
      // .update(
      //   { date: `${date}`,
      //    ingredients: this.ingredients
      //      } 
      // )
    }else{
      this.alertService.alert.next(true);
      this.alertService.message.next("Add Ingredient before you can save")
    }
   
   
  //  .set({
  //   date: `${date}`,
  //   ingredients: this.ingredients
  //   } , { merge: true }
  //   );
    
  }
  

  deleteIngredient(id:number){
    this.ingredients.splice(id,1);
    this.editMode.next(false);
    this.ingredientsHasChanged.next(this.ingredients.slice())
  }

  clearIngredients(){
    this.ingredients= [];
    this.ingredientsHasChanged.next(this.ingredients.slice())
  }
  updateIngredient(id:number, newIngredient: Ingredient){
    //this.ingredients[id]= newingredient;
    this.ingredients.splice(id,1,newIngredient);
    this.editMode.next(false)
    this.ingredientsHasChanged.next(this.ingredients.slice())
    
  }

  getIngredientToEdit(index:number){
   // console.log(this.ingredients);
    return this.ingredients[index] 
    }

    errorHandler(error){

      let errorMessage= "An unknown error occurred"
      if(!error.code || !error.message){
        return errorMessage;
      }

      switch(error.code){
        case 'auth/network-request-failed':
          errorMessage = 'Error in netwoerk connection';
          
      }
      this.alertService.alert.next(true);
      this.alertService.message.next(errorMessage);
      return errorMessage
    }

  // editIngredient(){
  //   //this.ingredients.splice(id,1,ing)
  // }
}
