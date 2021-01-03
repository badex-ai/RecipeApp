import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {trigger,state,style, animate, transition} from '@angular/animations';
import{AlertService} from '../../shared/alert/alert.service';



@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  animations:[

trigger('changeContainerbox',[
  state('expanded', style({
    width: '!',
  
  
     })),
     state('shrunk', style({
    
        width: '52.6rem',

        
    //  backgroundColor: "red"
       
  }),),
  transition('expanded<=>shrunk', animate('200ms')),
  // transition('expanded<=>shrunk',[group([  
  //   query('h1', [  
  //     style({ transform: 'translateY(-20px)' }),  
  //     animate('.1s ease-out' ) 
  //   ]),  
  //   query('.list-group-item',  
  //     stagger(200, [  
  //       style({ opacity: 0, transform: 'translateX(-20px)' }),  
  //       animate(1000)  
  //     ])  
  //   )  
  // ]) ], )
]),
trigger('changeRecipehome',[
  state('expanded', style({
    width: '*',
     })),
     state('shrunk', style({
      width: '46.6rem',
    //  backgroundColor: "red"
       
  }),),
 // transition('*=>expanded', animate('300ms')),
// transition('expanded<=>shrunk', animate('100ms')),

]),
trigger('changeRecipesbox',[
  state('expanded', style({
    width: '*',
     })),
     state('shrunk', style({
      width: '44.6rem',
   //   backgroundColor: "red"
       
  }),),
 // transition('*=>expanded', animate('300ms')),
 //transition('expanded<=>shrunk', animate('100ms')),

]),
trigger('changeRecipeslist',[
  state('expanded', style({
   
     gridTemplateColumns: '*',
    
   
  //  backgroundColor: "green"
     })),
     state('shrunk', style({
      gridTemplateColumns: '1fr',
    
      // display: 'flex',
      // flexDirection: 'column',
      // justifyContent: 'space-around',
    //  backgroundColor: "red"
       
  }),
  ),
 // transition('*=>expanded', animate('300ms')),
 //transition('expanded<=>shrunk', animate('5ms')),


]),

]
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];
  liked:boolean;
  likedItems: string[];
  islikeUrl:boolean;
  nofav:boolean;
  noInternet: boolean;
  toState:string = "expanded";
  isShrunk= false;
  isLoading:boolean = false;
  //notLoadMoreRecipe: true;

  private observer: IntersectionObserver;
  // @ViewChild('anchor1',{static:true}) anchor1: ElementRef<HTMLElement>;
  // @ViewChild('anchor2',{static:true}) anchor2: ElementRef<HTMLElement>;
  
  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    
   // console.log(this.route.snapshot.url[0])
    this.route.children.forEach((params:Params) => {
   //   console.log(params)
    })
    this.recipeService.newState.subscribe(value=>{
      console.log(value);
      this.toState = value;
      if(this.toState ==='shrunk'){
        this.isShrunk= true;
      }else{
        this.isShrunk = !this.isShrunk
      }
     // this.recipeService.expandTrigger.next(this.toState)
    })
    
   // console.log(this.route.snapshot.routeConfig)
    
   
    if(this.route.snapshot.url[0].path === 'liked-recipes'){
      this.islikeUrl = true;
      
      
      let rcp;
      let id;
      let likedItems ;
      this.recipeService.localData.subscribe((items:string[])=>{
      let recipes= [];
        likedItems = items;
        //console.log(items);
      //  console.log(likedItems);
       if(items === null || items.length === 0){
         this.nofav= true
       }
        likedItems.forEach(el=>{
          
         this.recipeService.getRecipe(el).subscribe((recipe)=>{
        //  recipes = []
        if(recipe == undefined){
          return this.noInternet= true
        }
        this.noInternet= false;
           id = el;
           rcp = {id,...recipe}
          // console.log(rcp);
           recipes.unshift(rcp)
           console.log(recipe)
        })
         
       });
      // console.log(rcp)
      this.recipes = recipes;
     // console.log(this.recipes)
    }) ;
    //  console.log(localStorage.getItem("LikedRecipes"))
       
    }else{
      // document.querySelector('.recipes__home');
       let isLeaving = false;


 const recipeBox = document.getElementById('nada');
//  console.log(document.getElementById('nada'));
//  console.log(document.getElementById('fill'));

 let recipeContainer = document.getElementById('fill');
 

    const config = {
    root: recipeBox,
   
    
    };
     
   
    let observer = new IntersectionObserver( (entries, self)=>{
      entries.forEach(entry => {
          if (entry.isIntersecting) {
            isLeaving= true;
            this.isLoading = true;
            var lastVisible = this.recipes[this.recipes.length - 1];
           // console.log(lastVisible);
            this.recipeService.loadMoreRecipes(lastVisible.name).subscribe((newRecipes:Recipe[])=>{
              this.isLoading = false;
              this.recipes.push(...newRecipes)
             //  newRecipes.forEach((el)=>{this.recipes.push(el)});
               
            });
            
          console.log('it has entered') ;
            
            
        //  self.unobserve(entry.target)
        }
        
        
            
      });
      
    }, config);


   // Array.from(recipes).forEach((recipe: Element) => { observer.observe(recipe) });
    observer.observe(recipeContainer);
  


        if(this.recipes.length === 0){
          this.recipeService.fetchRecipes().subscribe((recipes: Recipe[]) => {
            //  console.log(recipes)
              if(recipes == []){
                return this.noInternet= true
              }
            this.recipes = [...recipes] ;
          //  console.log(this.recipes)
            })
        }

        // this.recipeService.fetchRecipes().subscribe((recipes: Recipe[]) => {
        //   //  console.log(recipes)
        //     if(recipes == []){
        //       return this.noInternet= true
        //     }
        //   this.recipes = [...recipes] ;
        // //  console.log(this.recipes)
        //   })
        
       
  }
}

onExpand(){
  this.toState = 'expanded';
  this.isShrunk= false;
  console.log('expanded')
}

  onLoadAddNew(){
    this.router.navigate(['new'],{relativeTo:this.route});
    this.toState= 'shrunk';
    this.isShrunk= true;
  
    
  }

   


}

//THE AIM IS TO FORM AN ANIMATION RELATIONSHHIP BETWEEN THE RECIPES LIST, THE RECIPES DETAIL AND THE RECIPES EDIT
//WHEN THE RECIPES LIST IS EXPANDED THE RECIPES DETAIL SHOULD BE SHRUNK AND VICE VERSA
// THE LAST CONDITION IS WHEN THE RECIPES EDIT IS CANCELLED AND THE URL IS DERICTED TO THE RECIPES DETAIL,
//SHOULD BE AUTOMATICALLY SHRUNK IN OTHER TO ACCOMODATE THE RECIPES LIST TO EXPAND.
// I CREATED AN OBSERVABLE TO NOTIFY THE STATE OF THE RECIPES LIST ANIMATED STATUS BUT THIS DOES NOT AFFECT THE RECIPES DETAIL WHEN 
//THE RECIPES EDIT IS CANCELLED , THIS METHOD I USED MAYBE WRONG BUT HOPEFULLY YOU COULD GIVE ME A BETTER METHOD OF DOING THIS
//I HOPE I HAVE BEEN ABLE TO PASS ACCROSS MY MESSAGE
