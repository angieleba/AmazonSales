import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanLoad {
  constructor(private loginService : LoginService, 
    private router : Router) {

  }

  canLoad(
    route : Route,
    segments : UrlSegment[]
  ) : Observable<boolean> | Promise<boolean> | boolean {
     if (!this.loginService.isUserAuthenticated) {
       this.loginService.login();
     }
    return this.loginService.isUserAuthenticated;
  }
}
