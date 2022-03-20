import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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

          
      
        
    }),),
    transition('expanded<=>shrunk', animate('200ms')),
    
  ]),
  trigger('changeRecipehome',[
    state('expanded', style({
      width: '*',
       })),
       state('shrunk', style({
        width: '46.6rem',
      
        
    }),),
   

  ]),
  trigger('changeRecipesbox',[
    state('expanded', style({
      width: '*',
       })),
       state('shrunk', style({
        width: '44.6rem',
     
        
    }),),
   

  ]),
  trigger('changeRecipeslist',[
    state('expanded', style({
    
       gridTemplateColumns: '*',
      
    
    //  backgroundColor: "green"
       })),
       state('shrunk', style({
        gridTemplateColumns: '1fr',
      
        
        
    }),
    ),
   


  ]
  ),

  ]
})
export class RecipesListComponent implements OnInit {
  @Input() isLikeUrl: boolean;
  


  recipes: Recipe[] = [];
  liked:boolean;
  likedItems: string[];
  islikeUrl:boolean;
  nofav:boolean;
  Internet: boolean= true;              //FOR CHECKING IF INTERNET ACCESS IS PRESENT
  toState:string = "expanded";
  expander = false;
  isLoadingNewRcp:boolean = false;         //FOR DISPLAYIN AND SHOWING THAT NEW SET OF RECIPES ARE LOADED
  isLoadingFirstRcp: boolean;       //FOR CHECKING IF THE FIRST BATCH OF RECIPES IS BEING LOADED
  batch= 2;
  lastkey="";
  finished= false;
  isLoadingLike: boolean;                   // FOR CHECKING IS LIKED URL IS BEING LOADED
  demoRecipes=[1,2,3,4,5,6,7,8,9,10];       //DEMO ARRAY OF RECIPES FOR THE SKELTON LOADER
  firstIsLoaded: boolean;         //FOR CHECKING IF THE FIRST BATCH OF RECIPE IS LOADED
  totalFetchedRecipes: Recipe[];
  // isLeaving: boolean;
  // observer: IntersectionObserver;
 


  
  

  
  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService,private alertService: AlertService) {
    
  
   }

  ngOnInit() {
    
  
    this.recipeService.rcp.subscribe(val=>{
      this.recipes= val;
    })
   
    this.route.children.forEach((params:Params) => {
   
    })

    this.recipeService.hasIntConnected.subscribe(val=>{
      
      
      
      
       if(val.netConn === false && val.intConn === false ){
        this.Internet= false
       
       }else{
         this.Internet= true
       }
      
  
    
    
      
    })

    this.recipeService.firstIsLoaded.subscribe(val=>{
      this.firstIsLoaded= val;
    })
    this.recipeService.loadingRecipes.subscribe(val=>{
      this.isLoadingFirstRcp= val
     
    })
    
   
    if(this.isLikeUrl){
      
     
       
      
      
      this.islikeUrl = true;
    
      
      
      let rcp;
      let id;
      let likedItems ;
      this.Internet= true;

      
      this.recipeService.localData.subscribe((items:string[])=>{
        this.isLoadingLike= true;
      let recipes= [];
        likedItems = items;
       
       if(items === null || items.length === 0){
         this.nofav= true;
         this.isLoadingFirstRcp= false;
       }else{
        likedItems.forEach(el=>{
          
          
         
          this.recipeService.getRecipe(el).subscribe((recipe)=>{
        
           this.recipeService.firstIsLoaded.next(true);
       
         
            id = el;
            if(recipe){
               rcp = {id,...recipe}
               recipes.unshift(rcp)
           }
           
           
        
         })
          
        });
       }

        
      
      //  if(recipes.length==0){
      //   this.noInternet= true
      //  }
      this.recipes = recipes;
      this.isLoadingLike= false
          this.recipeService.loadingRecipes.next(false)
      
     
    }) ;
    this.recipeService.loadingRecipes.next(false)
       
    }else{

   
    
      
      this.recipeService.isShrunk.subscribe(value=>{
       
         
         this.expander = value
         if(value){
           this.toState= "shrunk";
         }else{
           this.toState = "expanded";
         }
    
       })
     
       let isLeaving = false;


    const recipeBox = document.getElementById('nada');


    const recipeContainer = document.getElementById('fill');
 

    const config = {
    root: recipeBox,
    //threshold: 1,
   
    
    };
   
   
    let observer = new IntersectionObserver( (entries, self)=>{
      entries.forEach(entry => {

          const currentY = entry.boundingClientRect.y
          const currentRatio = entry.intersectionRatio
          const isIntersecting = entry.isIntersecting


          if (entry.isIntersecting) {
            isLeaving = true;
            if(!this.isLoadingFirstRcp){
              this.isLoadingNewRcp = true;
            }

           

            
            if(!this.Internet && this.totalFetchedRecipes.length > 0){
             
                 
                 this.alertService.alert.next(true);
                this.alertService.message.next('Internet connection unavailable')
                }
            

          
            
            var lastVisible = this.recipes[this.recipes.length - 1];
            this.recipeService.loadMoreRecipes(lastVisible.name).subscribe((newRecipes:Recipe[])=>{
             
              this.isLoadingNewRcp = true;
              if(newRecipes !== []){
                this.totalFetchedRecipes.push(...newRecipes)
              }
              if(newRecipes.length == 0){
                this.isLoadingNewRcp= false
              }
              this.recipeService.rcp.next(this.totalFetchedRecipes)
             
              
              // this.recipes= this.totalFetchedRecipes
              
             //  newRecipes.forEach((el)=>{this.recipes.push(el)});
               
            });
            
        }
      }); 
       
    }, config);


   // Array.from(recipes).forEach((recipe: Element) => { observer.observe(recipe) });
     observer.observe(recipeContainer);


       







          //********************LOAD FIRST RECIPES ****************/  

      this.recipeService.rcp.subscribe((rcp)=>{
        if(rcp==null){
          this.recipeService.fetchRecipes().subscribe((recipes: Recipe[]) => {
            

              
              this.totalFetchedRecipes=[...recipes];
              this.recipeService.rcp.next(this.totalFetchedRecipes);
              this.isLoadingNewRcp= false;
              this.recipes = this.totalFetchedRecipes ;
              if(this.totalFetchedRecipes.length === 10){
                // console.log(this.totalFetchedRecipes.length === 10)
                this.recipeService.firstIsLoaded.next(true);
                sessionStorage.setItem('visited', "true")
               
               
              }
              
              this.recipeService.loadingRecipes.next(false)
            //  sessionStorage.clear()

              
            
             
          
          })
          
          // console.log(sessionStorage.getItem('visited'));
          // sessionStorage.setItem('visited', "true")
        }else{
          sessionStorage.clear()
          this.recipes= [...rcp]
          // sessionStorage.setItem('visited',"true")
        }
      })

                
        

  
        
       
  }
  

 


}










// onScroll(){
//   console.log("scrolling")
//   if(!this.Internet && this.totalFetchedRecipes.length > 0){
             
                 
//                    this.alertService.alert.next(true);
//                   this.alertService.message.next('Internet connection unavailable')
//                   }
              
  
            
              
//               var lastVisible = this.recipes[this.recipes.length - 1];
//               this.recipeService.loadMoreRecipes(lastVisible.name).subscribe((newRecipes:Recipe[])=>{
               
//                 this.isLoadingNewRcp = true;
//                 if(newRecipes !== []){
//                   this.totalFetchedRecipes.push(...newRecipes)
//                 }
//                 if(newRecipes.length == 0){
//                   this.isLoadingNewRcp= false
//                 }
//                 this.recipeService.rcp.next(this.totalFetchedRecipes)
//               })
//   }

onExpand(){

  this.recipeService.isShrunk.next(false)
  this.expander = false;
  
}

  onLoadAddNew(){
    this.router.navigate(['new'],{relativeTo:this.route});
    this.recipeService.isShrunk.next(true);
    
    this.expander= false;
  
    
  }

   


}

//THE AIM IS TO FORM AN ANIMATION RELATIONSHHIP BETWEEN THE RECIPES LIST, THE RECIPES DETAIL AND THE RECIPES EDIT
//WHEN THE RECIPES LIST IS EXPANDED THE RECIPES DETAIL SHOULD BE SHRUNK AND VICE VERSA
// THE LAST CONDITION IS WHEN THE RECIPES EDIT IS CANCELLED AND THE URL IS DERICTED TO THE RECIPES DETAIL,
//SHOULD BE AUTOMATICALLY SHRUNK IN OTHER TO ACCOMODATE THE RECIPES LIST TO EXPAND.
// I CREATED AN OBSERVABLE TO NOTIFY THE STATE OF THE RECIPES LIST ANIMATED STATUS BUT THIS DOES NOT AFFECT THE RECIPES DETAIL WHEN 
//THE RECIPES EDIT IS CANCELLED , THIS METHOD I USED MAYBE WRONG BUT HOPEFULLY YOU COULD GIVE ME A BETTER METHOD OF DOING THIS
//I HOPE I HAVE BEEN ABLE TO PASS ACCROSS MY MESSAGE
