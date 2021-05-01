import { Component, OnDestroy, OnInit } from '@angular/core';
import{ ActivatedRoute, Router, Params } from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import{ ShoppingListService} from '../../shopping-list/shopping-list.service';
import {trigger,state,style, animate, transition} from '@angular/animations';
import {AlertService} from '../../shared/alert/alert.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.scss'],

})
export class RecipesDetailComponent implements OnInit, OnDestroy {
  recipe:Recipe;
  recipes: Recipe[];
  safeUrl: any;
  isLoading : boolean= true;
  safeImg: SafeResourceUrl;
  safeUrls: SafeResourceUrl[];
  id:string;
  isCollapsed: boolean = false;
  toState:string = "expanded";
  paramsSub: Subscription;
  rcpSub: Subscription;
  triggered: string = 'expanded';
  showSub: boolean= true;
  isLoadingRcp:boolean= true;
  

  constructor(private router: Router, private route: ActivatedRoute, private recipeService: RecipeService, private sanitizer:DomSanitizer,private shoppingListService: ShoppingListService,
    private alertService: AlertService ) { }
  

  byPassUrl(url: string){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
  // gotVideo(video:string){
  //   this.video= video
  // }

    ngOnInit() {
      
     
      
      // if(this.route.url[0].path== 'liked-recipe'){

      // }
      
      
//         this.recipeService.collapseDetail.subscribe(value=>{ 
//           this.isCollapsed = value;
//           //console.log(value);
//           this.showSub= false;
          
//           var element = document.getElementById('targetElement');
// if ( this.isCollapsed) {
//   element.classList.add('shrink'); // to add a class
// } else {
//   element.classList.remove('shrink'); // to remove a class
// }

          
    
//         })
      
      

       this.paramsSub = this.route.params.subscribe((params:Params) => {
      
      this.id = params['id'];
      //console.log(this.isLoadingRcp, "to check the detail load")
      
     // //console.log(this.id)
        this.recipeService.getRecipe(this.id).subscribe(
          
        (recipe) => {
          this.recipe = recipe;
          this.isLoadingRcp= false;
         //console.log(this.isLoadingRcp,'this is the inner check');
          this.safeUrls=[];
          
        //  //console.log(this.recipe);
          let videos = this.recipe.vidUrls;
        //  //console.log(videos);
          this.safeImg = this.byPassUrl(this.recipe.imgUrl)
  
          for(let i = 0; i < videos.length; i++){
  
            //let safeUrl: SafeResourceUrl;
           this.safeUrl = this.byPassUrl(`${videos[i].vidUrl}`)
          // //console.log(this.safeUrl);
            this.safeUrls.push(this.safeUrl);
          
          }
          this.loadvid()
      //    //console.log(this.safeUrls)
       //   //console.log(this.recipe)
          
          
        }
        
        
       );
      
       
     // //console.log(this.recipe)
    })

    this.recipeService.isShrunk.subscribe(value=>{
      //console.log(this.route.snapshot.parent.routeConfig.path);

      if(this.route.snapshot.parent.routeConfig.path === "liked-recipes"){
        //console.log(value)
        //console.log('yooooo in liked', )
        this.isCollapsed= true
      }else{
        //console.log(value)
        //console.log('not in liked')
        this.isCollapsed = value
      }
      
    })

    

     // let videos = this.recipe.vidUrls;
      
       
      
      ////console.log(this.safeUrl);
      ////console.log(this.video);
      
       
  //    // //console.log(this.safeUrls)
  //     // //console.log(this.safeUrls)
  //     ////console.log(this.recipe)
  //   });

    //  this.recipeService.fetchRecipes().subscribe((recipes: Recipe[])=>{
    //    this.recipes = recipes;
    //   //this.safeUrls=[];
    //   let recCont = this.recipes.filter((el)=>{
    //     //console.log(el.id)
    //     //console.log(this.id)
    //     return el.id === this.id
    //   });
    // //  //console.log(recCont)
    //    this.recipe = recCont[0]
    //  // this.recipe = recipes[this.id];
    //   //console.log(this.recipe);
    //  // //console.log(this.recipe.vidUrls);
    //   let videos = this.recipe.vidUrls;
    //   // //console.log(videos);
    //   for(let i = 0;i < videos.length; i++){

    //     //let safeUrl: SafeResourceUrl;
    //    this.safeUrl = this.byPassUrl(`${videos[i].vidUrl}`)
    //     //console.log(this.safeUrl);
    //      this.safeUrls.push(this.safeUrl);
    //      //console.log(this.safeUrls)
      
    //    }
    //   // // videos= ;
    //   // // 
    //   //  //console.log(this.safeUrls)
      
    // })

    
  //  ////console.log(this.recipe)
  //  this.isLoading = false
   
 }
  loadvid(){
    setTimeout(function(){ this.isLoading = false;
   // //console.log('shlooomoohhhh') 
  }
    , 2000);
   // //console.log('live life')
  }
 
   onExpandInst(){
     this.recipeService.expand.next({recipe: this.recipe,state: true})
   }

      onEditRecipe(){
        this.recipeService.isShrunk.next(true);
        this.recipeService.editMode.next(true);
        this.router.navigate(['edit'],{relativeTo:this.route})
      }
      
      ondeleteRecipe(){
        let  result= confirm("Are you sure you want to delete account?");
        if(result){
          this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['../'], {relativeTo: this.route})
        }
        
      }
      onClickShrink(){
        this.toState= 'shrunk';
        //console.log('Button Clicked');
        this.showSub = false;
      }
      onClickShare(){
      //  //console.log(...this.recipe.ingredients)
       this.shoppingListService.addIngredient(...this.recipe.ingredients);
       this.alertService.alert.next(true);
      this.alertService.message.next("Item Added successfully to Shopping List");
      }
      ngOnDestroy(){ 
        this.paramsSub.unsubscribe();
        //this.rcpSub.unsubscribe()
      }
  

}
