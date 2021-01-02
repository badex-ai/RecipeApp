import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes/recipe.model';
import {RecipeService} from './recipes/recipe.service'
import { Instruction } from './shared/Instruction.model';
import { AuthService} from './auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router, ActivatedRoute, RouterOutlet} from '@angular/router';
import {AlertService} from './shared/alert/alert.service';
import {trigger,state,style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
  title = 'RecipeApp';
  recipe:Recipe;
  expandState:boolean;
  alert: boolean = false; 

  constructor(private recipeService: RecipeService, private authService: AuthService,
    private router: Router, private route: ActivatedRoute,
    private afAuth:AngularFireAuth,
    private alertService: AlertService){
    
  }
  ngOnInit() {
    this.authService.AutoLogin()
    this.alertService.alert.subscribe(value=>{
      this.alert = value;
      setTimeout(()=>{
        console.log("Bazinga");
      // this.alert= false;
       this.alert = false},1750)
      
    })

    this.recipeService.expand.subscribe((instruction:Instruction)=>{
     // console.log(instruction);
     // console.log(instruction.state)
      this.recipe = instruction.recipe;
      this.expandState = instruction.state


      
    });

   
    
  }
  
  hideAlert(){
    console.log("Bazinga");
   // this.alert= false;
    this.alertService.alert.next(true)
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  
  
 
  



}
