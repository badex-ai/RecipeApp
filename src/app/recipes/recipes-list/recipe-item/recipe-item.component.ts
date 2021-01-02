import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RecipeService} from '../../recipe.service';
import { Recipe } from '../../recipe.model';
import { ReturnStatement } from '@angular/compiler';
import {Router, ActivatedRoute} from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
  
})
export class RecipeItemComponent implements OnInit {
  @Input('rcpInput') recipe: Recipe;
  @Input() index:string;
  @Input() isLikeUrl:boolean;
  //@Output() loadDetailEvent = new EventEmitter<string>();
  //newState= new Subject();

  isLiked:boolean;
  likedRecipes:string[];
  
  
  

  

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
    
  }
    

  ngOnInit() {
    const init = this.getLocalStorage();
  init.forEach(element => {
      if( this.recipe.id == element ){
        this.isLiked= true
      }
    });

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

  getLocalStorage(){
    const existing = JSON.parse(localStorage.getItem('LikedRecipes'));
    // console.log(existing);

     existing ? this.likedRecipes = existing : this.likedRecipes = [];
     return this.likedRecipes
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

  onChangeState(){
    // this.loadDetailEvent.emit("shrink")
    //this.newState.next('shrink')
    this.recipeService.newState.next('shrunk')
  }
}
