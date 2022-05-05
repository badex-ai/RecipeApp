import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {trigger,state,style, animate, transition} from '@angular/animations';
import{AlertService} from '../../shared/alert/alert.service';
import {AuthService} from '../../auth/auth.service';




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
  

  isAuthenticated:boolean = false;
  recipes: Recipe[]=null;
  liked:boolean;
  likedItems: string[];
  islikeUrl:boolean;
  nofav:boolean;
  images: HTMLImageElement[];
  Internet: boolean= true;              //FOR CHECKING IF INTERNET ACCESS IS PRESENT
  toState:string = "expanded";
  expander = false;
  isLoadingNewRcp:boolean = false;         //FOR DISPLAYIN AND SHOWING THAT NEW SET OF RECIPES ARE LOADED
  isLoadingFirstRcp: boolean;       //FOR CHECKING IF THE FIRST BATCH OF RECIPES IS BEING LOADED
  batch= 2;
  scrollFetchRecipes: Recipe[] = null;
  
  lastkey="";
  finished= false;
  isLoadingLike: boolean;                   // FOR CHECKING IS LIKED URL IS BEING LOADED
  demoRecipes= [...Array(14).keys()]      //DEMO ARRAY OF RECIPES FOR THE SKELTON LOADER
  firstIsLoaded: boolean;         //FOR CHECKING IF THE FIRST BATCH OF RECIPE IS LOADED
  totalFetchedRecipes: Recipe[];
  
  // isLeaving: boolean;
  // observer: IntersectionObserver;
 


  
  

  
  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService,private authService: AuthService,private alertService: AlertService) {
  
  
   }

  

  ngOnInit() {
   
    
  
    
    this.recipeService.rcp.subscribe( (result)=>{
 
       if(result !== null){
         this.recipes= [...result];
       }else{

        this.recipeService.fetchRecipes().subscribe( async (results) => {
          console.log("check")

        
         

       const preloadedImg=  await this.recipeService.preloadImages(results)
         
    
         
        

       
          



            this.totalFetchedRecipes=[...results ];
            this.recipeService.rcp.next(results);
            this.isLoadingNewRcp = false;
            
            
            if(this.totalFetchedRecipes.length === 14){
              
              this.recipeService.firstIsLoaded.next(true);
              sessionStorage.setItem('visited', "true")
             
             
            }
            
            this.recipeService.loadingRecipes.next(false)
          //  sessionStorage.clear()

            
          
           
        
        })



       
       }
      
       
       

      
     
      
    })

    // this.recipeService.rcp.subscribe((rcp)=>{
    //   if(rcp==null){
        
        
    //     // console.log(sessionStorage.getItem('visited'));
    //     // sessionStorage.setItem('visited', "true")
    //   }else{
    //     sessionStorage.clear()
    //     this.recipes= [...rcp]
    //     // sessionStorage.setItem('visited',"true")
    //   }
    // })

   
    // this.route.children.forEach((params:Params) => {
   
    // })

    this.authService.user.subscribe((user)=>{
         
      //   console.log(user)
         this.isAuthenticated = !!user;
        //  this.user = {...user};
        // console.log(this.user)
         // console.log(this.user.photoURL.split("upload/"));
         // console.log(arr);
         //console.log('i am  2 working')
         
         if(!user){
            this.authService.checkSession();
           //  let arr = this.user.photoURL.split("upload/");
           //  console.log(arr);
         }
 
       
         
         
       
       
       
      
 
 
 
       
       
 
        
         
        
         
       })

    // this.recipeService.hasIntConnected.subscribe(val=>{
    //    if(val.netConn === false && val.intConn === false ){
    //     this.Internet= false      
    //    }else{
    //      this.Internet= true
    //    }     
    //  })

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
        likedItems.forEach((el: string)=>{
          
          
         
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
     
       




 

    
   
   
  
      

                
        

  
        
       
    }
  

 


  }

  onScroll(){
  

               
             
            
              
    const lastVisible = this.recipes[this.recipes.length - 1].createdOn;
    
    
    if(lastVisible != null ){
      
      
      this.recipeService.fetchMoreRecipes(lastVisible).subscribe(async (newRecipes)=>{

        const preloadedImg=  await this.recipeService.preloadImages(newRecipes)
        
      
        if(newRecipes.length === 0) {
          this.scrollFetchRecipes = newRecipes;
          return
        }
          
              console.log('fetching on scroll')
               this.isLoadingNewRcp = true;
             
               
                  // this.recipes = [...this.recipes, ...newRecipes];
                //  this.totalFetchedRecipes.push(...newRecipes)
               
               
                 this.isLoadingNewRcp= false
               
               this.recipeService.rcp.next([...this.recipes, ...newRecipes])

      })
    }

  }





// if(!this.Internet && this.totalFetchedRecipes.length > 0){
             
                 
  //                  this.alertService.alert.next(true);
  //                 this.alertService.message.next('Internet connection unavailable')
  //                 }
              // if 







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
