import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';  
import { RecipeService} from '../recipe.service';


@Component({
  selector: 'app-recipes-default-detail',
  templateUrl: './recipes-default-detail.component.html',
  styleUrls: ['./recipes-default-detail.component.scss'],
  
})

export class RecipesDefaultDetailComponent implements OnInit {
  isLikeUrl:boolean;
  

  constructor(private route: ActivatedRoute,private recipeService: RecipeService ) { }

  ngOnInit() {
    //console.log()
  //  console.log(this.route)
    if(this.route.snapshot.parent.url[0].path === 'liked-recipes'){
      this.isLikeUrl = true;
    }
    // this.recipeService.likeClicked.subscribe(value =>{
    //   console.log(value)
    //   this.isLikeUrl = value
    // })
    
    
  }

}
