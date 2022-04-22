import { Component, OnInit } from '@angular/core';

  import {ActivatedRoute, Router} from '@angular/router';
  import {Recipe} from '../../recipes/recipe.model';
  import {RecipeService} from '../../recipes/recipe.service';
  

@Component({
  selector: 'app-liked-list',
  templateUrl: './liked-list.component.html',
  styleUrls: ['./liked-list.component.scss']
})
export class LikedListComponent implements OnInit {
  
  

  
  
    recipes: Recipe[];
    liked:boolean;
    likedItems: string[];
    islikeUrl:boolean;
    
    constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) { }
  
    ngOnInit() {
      
      //this.route.params.subscribe()
      if(this.route.snapshot.url[0].path === 'liked-recipes'){
        this.islikeUrl=true;
        let recipes = [];
        const likedItems = JSON.parse(localStorage.getItem("LikedRecipes")) ;
      //  console.log(localStorage.getItem("LikedRecipes"))
        //  console.log(likedItems);
         
          likedItems.forEach(el=>{
           this.recipeService.getRecipe(el).subscribe((recipe)=>{
             recipes.push(recipe)
            // console.log(recipe)
           })
           
         });
        this.recipes = recipes
      }else{
          this.recipeService.fetchRecipes().subscribe((recipes: Recipe[]) => {
          this.recipes = recipes;
          // console.log(this.recipes)
          })
    }
  }
  
    onLoadAddNew(){
      this.router.navigate(['new'],{relativeTo:this.route});
      //window.scroll({ top: 0,left: 0,behavior: 'smooth' })
      
    }
  
  
  

}
