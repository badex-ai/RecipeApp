import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {RecipeService} from './recipes/recipe.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router, ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecipeGuard implements CanActivate, CanDeactivate<unknown> {

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute,private afAuth: AngularFireAuth){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //   let userStatus;
    //   this.afAuth.onAuthStateChanged(value=>{
    //     if(value){
    //       console.log(value);
    //       userStatus = true
    //     }else(
    //       userStatus = false
    //     )
    //   })
    // if(userStatus){return true}
    // else return this.router.createUrlTree(['/login']);
    return true
  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.recipeService.expand.next({state:false});
      
      
      return true;
  }
  
}
