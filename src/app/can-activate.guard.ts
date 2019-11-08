import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MyrouteService } from './myroute.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {
 constructor(private routeService:MyrouteService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     let jwttok= localStorage.getItem('Bearertoken');
        if(jwttok==null){
         this.routeService.openLogin();
          //return false;
        }
      //  else
       
        //this.routeService.routeToDashboard();
         return true;
        
      }
}
