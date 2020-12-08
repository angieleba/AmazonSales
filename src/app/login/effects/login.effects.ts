import { Injectable } from '@angular/core';
import { LoginRequest, LoginSuccess, LoginError } from '../actions/login.actions';
import { LoginActionTypes } from '../LoginActionTypes';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AppState } from 'src/app/AppState';
import { Store } from '@ngrx/store';
import { LoginService } from '../login.service';
import { User } from '../user.model';
import { Account } from 'msal';
import { of } from 'rxjs';
import { ProductListRequest } from 'src/app/home/actions/products.actions';

 @Injectable()
 export class LoginEffects {

     @Effect()
     login$ = this.actions$
     .pipe(
         ofType<LoginRequest>(LoginActionTypes.LoginRequest),
         mergeMap(() => this.loginService.login()
         .pipe(
           mergeMap(account => [
             new LoginSuccess(new User(account as Account)), 
             new ProductListRequest()
           ]),
           catchError((error) => of(new LoginError(error)))
         ))
);

     constructor(private actions$: Actions, private store: Store<AppState>, private loginService: LoginService ) { }
 }

