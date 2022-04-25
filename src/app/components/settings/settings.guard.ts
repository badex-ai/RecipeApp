import { Injectable } from '@angular/core';
import { CanActivate,CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {SettingsService} from './settings.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsGuard implements CanActivate,CanDeactivate<unknown> {
  constructor(private settingsService: SettingsService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.settingsService.settingsClicked.next(false);
      
      
      return true;
  }
  
  
}
