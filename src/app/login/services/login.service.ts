import { Injectable } from "@angular/core";
import * as Msal from "msal";
import {
  loginRequest,
  b2cPolicies,
} from "../../configuration";
import { throwError, Observable, of } from "rxjs";
import { MsalService } from "@azure/msal-angular";
import { Store } from "@ngrx/store";
import { AppState } from "../../AppState";
@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(
    private authService: MsalService,
    private store: Store<AppState>
  ) {}

  login(): Observable<Msal.Account> { 
    console.log("Entered login");
    const isIE =
      window.navigator.userAgent.indexOf("MSIE ") > -1 ||
      window.navigator.userAgent.indexOf("Trident/") > -1;

    if (isIE) {
      this.authService.loginRedirect();
      return of(this.authService.getAccount());
    } else {
      this.authService
        .loginPopup(loginRequest)
        .then((loginResponse) => {
          console.log("id_token acquired at: " + new Date().toString());
          if (!loginResponse.account) {
            return throwError("No account found.");
          } else {
            return of(loginResponse.account);
          }
        })
        .catch((error) => {
          // Error handling
          if (error.errorMessage) {
            // Check for forgot password error
            // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
            if (error.errorMessage.indexOf("AADB2C90118") > -1) {
              this.authService
                .loginPopup(b2cPolicies.authorities.forgotPassword)
                .then((loginResponse) => {
                  console.log(loginResponse);
                  window.alert(
                    "Password has been reset successfully. \nPlease sign-in with your new password."
                  );
                });
            }
          }
          return throwError("Error in login", error);
        });
    }
    return of(this.authService.getAccount());
  }

  // Sign-out the user
  logout(): Observable<boolean> {
    try {
      // Removes all sessions, need to call AAD endpoint to do full logout
      this.authService.logout();
      return of(true);
    } catch (err) {
      return throwError(err);
    }
  }

  checkoutAccount() {
    return this.authService.getAccount();
  }
}
