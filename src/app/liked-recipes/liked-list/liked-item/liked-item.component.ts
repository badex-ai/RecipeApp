import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';

@Component({
  selector: 'app-liked-item',
  templateUrl: './liked-item.component.html',
  styleUrls: ['./liked-item.component.scss']
})
export class LikedItemComponent implements OnInit {
//  @Input('rcpInput') 
recipe: Recipe;
 // @Input() index:string;
  isLiked:boolean;
  likedRecipes:string[];
  constructor() { }

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
    //  console.log(this.likedRecipes);
    localStorage.setItem('LikedRecipes',JSON.stringify(this.likedRecipes))

     this.likedRecipes = JSON.parse(localStorage.getItem('LikedRecipes'));
    //  console.log(this.likedRecipes)
     
    // this.LikedItems.push(rtvLiked)
  }
}



