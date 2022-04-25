import { Injectable, OnInit } from '@angular/core';
import {Recipe} from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { BehaviorSubject, Observable, Subject,AsyncSubject } from 'rxjs';
import { VidUrl } from '../shared/vidUrl.model';
import { Instruction } from '../shared/Instruction.model';
import {DataService} from '../shared/data.service';
import {map, tap, take, exhaustMap, catchError, retry} from 'rxjs/operators';
import { AngularFirestore,  AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { HttpErrorResponse } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})

export class RecipeService implements OnInit{
  editMode = new Subject<boolean>();
  recipesHasChanged = new Subject<Recipe[]>();
  expand = new Subject<Instruction>();
  recipesCollection: AngularFirestoreCollection<Recipe>;
  recipeDoc: AngularFirestoreDocument<Recipe>;
  firstRecipes: Recipe[];
  recipes : Observable<Recipe[]>;
  recipe: Observable<Recipe>;
  rcp = new BehaviorSubject<Recipe[]>(null);
  firstIsLoaded= new BehaviorSubject<boolean>(false);
  loadingRecipes= new BehaviorSubject<boolean>(true);
  isShrunk = new BehaviorSubject<boolean>(false);
  collapseDetail  = new Subject<boolean>();
  expandTrigger = new Subject<string>();
  fetchMoreCount = 1;
  hasIntConnected= new BehaviorSubject<any>({netConn: true, intConn:true});
 // searchedRecipe: Subject<Recipe>;
  recipeClicked =  new Subject<Recipe>();
  //likeClicked = new Subject<boolean>();
  localData = new BehaviorSubject<string[]>(JSON.parse(localStorage.getItem("LikedRecipes")));
  
  constructor(private firestore: AngularFirestore) {
    this.recipesCollection = this.firestore.collection( 'Recipes');
    //this.recipeDoc= this.firestore.doc<Recipe>('${id}')
   }

  ngOnInit() {}

  // .orderBy("population",'desc')
  
    loadMoreRecipes(last: string){
     // var lastVisible = this.recipes[this.recipes.length-1];
      //let startingPoint= ((this.fetchMoreCount * 2) + 1) ;
      
      this.recipes = this.firestore.collection( 'Recipes', ref => ref.orderBy("createdOn",'desc').startAfter(last).limit(10)).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Recipe;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
        )
       );
       this.fetchMoreCount++
        return this.recipes
    }
    
    
  fetchRecipes() {
    this.recipes = this.firestore.collection( 'Recipes', ref => ref.orderBy("createdOn",'desc').limit(10)).snapshotChanges().pipe(
     map(actions => actions.map(a => {
       const data = a.payload.doc.data() as Recipe;
       const id = a.payload.doc.id;


      

       return { id, ...data };

      
     })
     
     
     ),map(data=>{
        
         let imgArray = data.map(item=>{
          
         
          return item.imgUrl
        })
        let images = new Array()

        function preload(...ir :string[]) {
          for (let i = 0; i < ir.length; i++) {
            console.log(ir.length)

            images[i] = new Image()
            // images[i].src = preload.arguments[i]
            images[i].src = ir[i]
          }
        }

        preload(
          ...imgArray
        )
        console.log(images)
        return data
     }),retry(2),tap(recipes=>{
   //    console.log(recipes);
       this.firstRecipes = recipes
     })
    // this.recipes = this.firestore.collection( 'Recipes', ref => ref.orderBy("createdOn",'desc').limit(10)).snapshotChanges().pipe(
    //  map(actions => actions.map(a => {
    //    const data = a.payload.doc.data() as Recipe;
    //    const id = a.payload.doc.id;
    //    return { id, ...data };
    //  })
    //  ),tap(recipes=>{
    //   console.log(recipes);
    //    this.firstRecipes = [{
    //       id: '',
    //       name: '',
    //       ingredients: [],
    //       instructions: [],
    //       createdOn: Date.now(),
    //       likes: 0,

    //    }]
    //  })
     

     
    // //  ,tap(maindata => {

    // //  console.log(maindata);
    // //    this.recipeService.setRecipes(recipes);
    // //  })
    );
    
    
    // console.log(this.recipes);
     return this.recipes

 }
 
//  setRecipes(){
//   console.log(this.firstRecipes);
//   return this.firstRecipes
// }
  
   


  
   //console.log(this.recipes)
  updateRecipe(recipe:Recipe, id: string){
   

this.recipesCollection.doc<Recipe>(id).update(recipe).then(
  
);

 
  
    
  }

  //  getLocalStorage():Observable<string[]>{
  //   return this.localData.asObservable()
  
  //  }

  getRecipe(id: string){

   
     this.recipe = this.recipesCollection.doc<Recipe>(id).valueChanges()

    //  .pipe(
    //   catchError(
    //     this.errorHandler
    //   )
    //  );
     
   //  console.log(this.recipe);
   return this.recipe

    
   // return this.recipes[id];
    
  }

  private createIndex(title: string){
    const arr = title.toLowerCase().split('');
    const searchableIndex = {}

    let prevKey = '';
    for (const char of arr){
      const key = prevKey + char;
      searchableIndex[key] = true
      prevKey = key
    }

     return searchableIndex



  }


  
  addRecipe(recipe:Recipe){
   // this.recipes.push(recipe);
   let responseId
    this.recipesCollection.add(recipe).then(res=>{
      // console.log(res.id)
      responseId = res.id
      this.updateIndex(res.id,recipe)
     
    })
   
    return responseId
  }

  updateIndex(recipeId: string, recipe: Recipe){
    const Id = recipeId;
    // console.log(Id)
    const rcp = recipe ;
    const searchableIndex = this.createIndex(rcp.name)
    const indexedRecipe = {...rcp,searchableIndex}

    
   return  this.recipesCollection.doc(Id).set(indexedRecipe, {merge:true})
    
    
    


  }

  deleteRecipe(id: string){
    this.recipesCollection.doc<Recipe>(id).delete()
  }

  private errorHandler(errorRes: HttpErrorResponse){
    if(errorRes.error.error.message){
      // console.log('no internet Connection')
    }
  }
  
}

