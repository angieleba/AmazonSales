import { Injectable } from "@angular/core";
import { CanLoad, Route, UrlSegment, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AppState } from "../../AppState";
import { Store, select } from "@ngrx/store";
import { LoginRequest } from "../login-effect/login.actions";
import { filter, take, map } from "rxjs/operators";
import { UserIsLoggedin } from '../login-effect/loginLogout.reducers';

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanLoad {
  isUserAuthenticated: boolean;
  constructor(private store: Store<AppState>, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    var val = false;
    this.store.select(UserIsLoggedin).subscribe((s) => {
      if (!s) {
        this.store.dispatch(new LoginRequest());
      }
      val = s;
    });
    return val;
  }
}
