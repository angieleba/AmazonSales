import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppState } from '../AppState';
import { Store, select } from '@ngrx/store';
import {getIsLoggedIn } from './reducers/loginLogout.reducers';
import { LoginRequest } from './actions/login.actions';

@Injectable({
  providedIn: 'root'
})

export class LoginGuard implements CanLoad {
  isUserAuthenticated : boolean;
  constructor(private store : Store<AppState>, private router : Router) {}
  
  canLoad(
    route : Route,
    segments : UrlSegment[]
  ) : Observable<boolean> | Promise<boolean> | boolean {
    //  this.store.pipe(select(getIsLoggedIn)).subscribe(
    //    res => {
    //      this.isUserAuthenticated = res;
    //    }
    //  );

    //  if (!this.isUserAuthenticated) {
       this.store.dispatch(new LoginRequest());
    //  }

    // return this.store.select(getIsLoggedIn);
    return false;
}
}
