import { Component, OnInit } from '@angular/core';
import {RecipeService} from './recipe.service';
import {Recipe} from './recipe.model';
import {Observable } from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';

import { animate, animateChild, query, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  animations:[

    trigger('recipesListAnimation',[
      state('expanded', style({
        width: '!',
      
      
         })),
         state('shrunk', style({
        
            width: '52.6rem',
    
            
        //  backgroundColor: "red"
           
      }),),
      transition('expanded<=>shrunk',[animate('200ms'),
      query('listanimation', animateChild(), { optional: true })] ),
      
    ]),
    trigger('recipesInfoAnimation',[
      state('expanded', style({
        width: '!',
      
      
         })),
         state('shrunk', style({
        
            width: '66.6rem',
    
            
        //  backgroundColor: "red"
           
      }),),
      transition('expanded<=>shrunk', animate('200ms')),
      
    ])
  ]
})
export class RecipesComponent implements OnInit {
  isShrunk: boolean;
  isLikeUrl: boolean;

  
  constructor(private recipeService : RecipeService,private router: Router, private route: ActivatedRoute, ) { }

  ngOnInit() {
    if(this.route.snapshot.url[0].path === 'liked-recipes'){
      this.isLikeUrl= true;
    }else{ this.isLikeUrl= false}

    this.recipeService.isShrunk.subscribe(value=>{
    //  console.log(value)
      this.isShrunk = value
    })
    
  }

}
