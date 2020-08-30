import { Injectable } from "@angular/core";
import * as Msal from "msal";
import { loginRequest, b2cPolicies, tokenRequest, apiConfig } from '../configuration';
import { throwError, Observable, of } from 'rxjs';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: "root",
})

export class LoginService {
  constructor(
    private authService: MsalService,
  ) {}


  login() : Observable<Msal.Account>{
    console.log("Entered login");
    const isIE =
      window.navigator.userAgent.indexOf("MSIE ") > -1 ||
      window.navigator.userAgent.indexOf("Trident/") > -1;

    if (isIE) {
      this.authService.loginRedirect();
      return of(this.authService.getAccount());
    } else {
      this.authService.loginPopup(loginRequest)
      .then(loginResponse => {
        debugger;
        console.log("id_token acquired at: " + new Date().toString());       
        if (loginResponse.account) {
          debugger;
           
        } else {
          return throwError("No account found.");
        }
        
    }).catch(error => {      
      // Error handling
      if (error.errorMessage) {
        // Check for forgot password error
        // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
        if (error.errorMessage.indexOf("AADB2C90118") > -1) {
          this.authService.loginPopup(b2cPolicies.authorities.forgotPassword)
            .then(loginResponse => {
              console.log(loginResponse);
              window.alert("Password has been reset successfully. \nPlease sign-in with your new password.");
            })
        }
      }
      return throwError("Error in login", error);
    });      
    }
    return of(this.authService.getAccount());    
  }

// Sign-out the user
logout() {
  // Removes all sessions, need to call AAD endpoint to do full logout
  this.authService.logout();
}

checkoutAccount() {
  return this.authService.getAccount();
}

// Acquires and access token and then passes it to the API call
passTokenToApi() {
  this.getTokenPopup(tokenRequest)
    .then(tokenResponse => {
        var response = tokenResponse as Msal.AuthResponse;
        console.log("access_token acquired at: " + new Date().toString());
        try {
          console.log("Request made to Web API:", response.accessToken);       
          this.callApiWithAccessToken(apiConfig.webApi, response.accessToken);
        } catch(err) {
          console.log(err);
        }
    });
}

getTokenPopup(request) {
  return this.authService.acquireTokenSilent(request)
    .catch(error => {
      console.log("Silent token acquisition fails. Acquiring token using popup");
      console.log(error);
      // fallback to interaction when silent call fails
      return this.authService.acquireTokenPopup(request)
        .then(tokenResponse => {
          console.log("access_token acquired: " + tokenResponse);
          return tokenResponse;
        }).catch(error => {
          console.log(error);
        });
    });
}

callApiWithAccessToken(endpoint, token) {
  const headers = new Headers();
  const bearer = `Bearer ${token}`;
  headers.append("Authorization", bearer);

  const options = {
      method: "GET",
      headers : headers
    };

  fetch(endpoint, options)
    .then(response => {
      console.log("Web API returned:" + JSON.stringify(response));
    }).catch(error => {
      console.log("Error calling the Web api:\n" + error);
    });
  }
}