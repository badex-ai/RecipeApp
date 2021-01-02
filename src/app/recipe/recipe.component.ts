import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import{ ShoppingListService} from '../shopping-list/shopping-list.service';
import{ ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import {DataService} from '../shared/data.service';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
 recipe: Recipe;
 isLiked:boolean = false;
  recipes: Recipe[];
  safeUrl: any;
  isLoading : boolean= false;
  safeImg: SafeResourceUrl;
  safeUrls: SafeResourceUrl[];
  id:string;
  paramsSub: Subscription;
  rcpSub: Subscription;
  likedRecipes:string[];
  //paramsSub: any;
  constructor(private recipeService: RecipeService,private shoppingListService: ShoppingListService,private route: ActivatedRoute,private dataService: DataService, private sanitizer:DomSanitizer) { }

  

  byPassUrl(url: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
  

    ngOnInit() {
     
      
      
     
        
      

    this.paramsSub = this.route.params.subscribe((params:Params) => {
      console.log(params['name']);
      const init = this.getLocalStorage();
        console.log(init);
      let name = params['name'].replace('-',' ');
      console.log(name);
      this.dataService.searchRecipe(name).subscribe((result:Recipe[])=>{
        console.log(result[0].id);
        this.recipe= result[0];
        console.log(this.recipe);
        init.forEach(element => {
          //   console.log(this.recipe.id)
             if( this.recipe.id == element ){
               this.isLiked= true
             }
           })
        this.safeUrls=[];
          
        //  console.log(this.recipe);
          let videos = this.recipe.vidUrls;
        //  console.log(videos);
          this.safeImg = this.byPassUrl(this.recipe.imgUrl)
  
          for(let i = 0; i < videos.length; i++){
  
            //let safeUrl: SafeResourceUrl;
           this.safeUrl = this.byPassUrl(`${videos[i].vidUrl}`)
          // console.log(this.safeUrl);
            this.safeUrls.push(this.safeUrl);
          
          }
        //  this.loadvid()
        
      
          
      });
      
    })

    
        ;


   
 }

  loadvid(){
    setTimeout(function(){ this.isLoading = false;
   // console.log('shlooomoohhhh') 
  }
    , 2000);
   // console.log('live life')
  }
 
   onExpandInst(){
     this.recipeService.expand.next({recipe: this.recipe,state: true})
   }

      
      
      
      onClickShare(){
      //  console.log(...this.recipe.ingredients)
     
       this.shoppingListService.addIngredient(...this.recipe.ingredients)
      }
      ngOnDestroy(){ 
        this.paramsSub.unsubscribe();
        //this.rcpSub.unsubscribe()
      }
      getLocalStorage(){
        const existing = JSON.parse(localStorage.getItem('LikedRecipes'));
        // console.log(existing);
    
         existing ? this.likedRecipes = existing : this.likedRecipes = [];
         return this.likedRecipes
      }

      onClickUnlike(){
        this.getLocalStorage();
        let id:number;
        this.isLiked = !this.isLiked;
        this.likedRecipes.forEach(element => {
          if( this.recipe.id == element ){
           id = this.likedRecipes.indexOf(this.recipe.id)
          }
        });
        this.likedRecipes.splice(id,1);
        localStorage.setItem('LikedRecipes',JSON.stringify(this.likedRecipes));
        this.likedRecipes = JSON.parse(localStorage.getItem('LikedRecipes'));
        
        this.recipeService.localData.next(this.likedRecipes);
       // this.router.navigate(['liked-recipes'])
    
    
      }
      
        onClickLike(){
          this.getLocalStorage();
          this.isLiked= !this.isLiked;
          // console.log(this.recipe);
          
          // let newLiked = this.likedRecipes;
          // newLiked.push(this.recipe.id);
         //  console.log(this.likedRecipes);
           this.likedRecipes.push(this.recipe.id);
        //   console.log(this.likedRecipes);
          localStorage.setItem('LikedRecipes',JSON.stringify(this.likedRecipes))
      
           this.likedRecipes = JSON.parse(localStorage.getItem('LikedRecipes'));
           this.recipeService.localData.next(this.likedRecipes)
           
        //   console.log(this.likedRecipes)
           
          // this.LikedItems.push(rtvLiked)
        }
      

}
