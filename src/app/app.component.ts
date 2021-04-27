import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes/recipe.model';
import {RecipeService} from './recipes/recipe.service'
import { Instruction } from './shared/Instruction.model';
import { AuthService} from './auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router, ActivatedRoute, RouterOutlet} from '@angular/router';
import {AlertService} from './shared/alert/alert.service';
import { ConnectionService } from 'ngx-connection-service';
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
  isConnected: boolean;
  status: string;

  constructor(private recipeService: RecipeService, private authService: AuthService,
    private router: Router, private route: ActivatedRoute,
    private afAuth:AngularFireAuth,
    private connectionService: ConnectionService,
    private alertService: AlertService){
    //  console.log('Got here first bruh')

      this.connectionService.monitor().subscribe(currentState=> {
       
        let isConnected = currentState.hasNetworkConnection || currentState.hasInternetAccess;
        let netConn= currentState.hasNetworkConnection;
        let intConn= currentState.hasInternetAccess;
       // console.log(isConnected, 'this is the connection from the main app ')
        this.recipeService.hasIntConnected.next({netConn, intConn}) ;
     
      })
    
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
   // this.alert= false;
    this.alertService.alert.next(true)
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  
  
 
  



}
