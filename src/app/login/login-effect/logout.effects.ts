import { Injectable } from '@angular/core';
import { LoginActionTypes } from './LoginActionTypes';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { AppState } from 'src/app/AppState';
import { Store } from '@ngrx/store';
import { LoginService } from '../services/login.service';
import { of } from 'rxjs';
import { LogoutRequest, LogoutSuccess, LogoutError } from './login.actions';

@Injectable()
export class LogoutEffects {

    @Effect()
    logout$ = this.actions$
    .pipe(
        ofType<LogoutRequest>(LoginActionTypes.LogoutRequest),
        exhaustMap(() => this.loginService.logout()
        .pipe(
          map((res) => {
            return (new LogoutSuccess());
          }),
          catchError((error) => of(new LogoutError(error)))
        ))
);

    constructor(private actions$: Actions, private store: Store<AppState>, 
      private loginService: LoginService ) { }
}