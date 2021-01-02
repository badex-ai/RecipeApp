import { Injectable } from '@angular/core';
//import {HttpClient,HttpParams} from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import {map, tap, take, exhaustMap} from 'rxjs/operators';
//import { RecipeService} from '../recipes/recipe.service';
import {Observable, Subject} from 'rxjs';
import { AngularFirestore,  AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  searchResult = new Subject<Recipe>();
  recipesCollection: AngularFirestoreCollection<Recipe>;
  recipeDoc: AngularFirestoreDocument<Recipe>;
  recipes : Observable<Recipe[]>;
  
 // searchedRecipe: new Subject<Recipe>();
  recipe: Observable<Recipe>;

  constructor(private firestore: AngularFirestore,
    //private http: HttpClient,
  // private recipeService: RecipeService 
    ) {
    this.recipesCollection = this.firestore.collection('Recipes');
    console.log(this.recipesCollection)
   }

   private capitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  fetchRecipes():Observable<Recipe[]> {
     this.recipes = this.recipesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Recipe;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
      )
      
      // ,tap(maindata => {

      // console.log(maindata);
      //   this.recipeService.setRecipes(recipes);
     //  })
      );
      console.log(this.recipes);
      return this.recipes
  }


  searchRecipe(recipe:string)
  // :Observable<Recipe>
  {
  let recipe1= this.capitalizeFirstLetter(recipe)
    
  // console.log(recipe1)
   // const input = recipe.searched
   let response= this.firestore.collection('Recipes',ref => ref.where("name", "==", `${recipe1}`)).snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Recipe;
      const id = a.payload.doc.id;
      return { id, ...data };
    })
    )
    
    // ,tap(maindata => {

    // console.log(maindata);
    //   this.recipeService.setRecipes(recipes);
   //  })
   );
   return response
  }

 
//
  // storeRecipe(recipes:Recipe[]){
  //   this.http.put<Recipe[]>(
  //   '',
  //   recipes
  //   ).subscribe((responseDate)=>{
  //     console.log(responseDate)
  //   })
  // }
}
