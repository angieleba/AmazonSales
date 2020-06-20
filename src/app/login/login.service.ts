import { Injectable } from "@angular/core";
import { User } from "./user.model";
import * as Msal from "msal";
import { B2CConfig, B2CAuthority } from "src/environments/environment";
import { BroadcastService, MsalService } from "@azure/msal-angular";
import { Logger, CryptoUtils } from "msal";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  isUserAuthenticated = false;
  user : Account | null;

  constructor(
    private broadcastService: BroadcastService,
    private authService: MsalService
  ) {}

  login() {
    const isIE =
      window.navigator.userAgent.indexOf("MSIE ") > -1 ||
      window.navigator.userAgent.indexOf("Trident/") > -1;

    if (isIE) {
      this.authService.loginRedirect();
    } else {
      this.authService.loginPopup()
      .then(res => {
        console.log("Login:", res);
        this.isUserAuthenticated = true;
        this.handleRedirect();
        this.addLogging();
      });
        
    }
    this.isUserAuthenticated = true;
  }

  logout() {
    this.authService.logout();
  }
  checkoutAccount() {
    this.isUserAuthenticated = !!this.authService.getAccount();
    return this.isUserAuthenticated;
  }

  handleRedirect() {
    this.authService.handleRedirectCallback((authError, response) => {
      if (authError) {
        console.error("Redirect Error: ", authError.errorMessage);
        return;
      }

      console.log("Redirect Success: ", response);
    });
  }

  addLogging() {
    this.authService.setLogger(
      new Logger(
        (logLevel, message, piiEnabled) => {
          console.log("MSAL Logging: ", message);
        },
        {
          correlationId: CryptoUtils.createNewGuid(),
          piiLoggingEnabled: false,
        }
      )
    );
  }
}
