import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { throwError, of, Observable, from } from 'rxjs';
import * as Msal from "msal";
import { MsalService } from '@azure/msal-angular';
import { apiConfig, tokenRequest } from 'src/app/configuration';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private _http: HttpClient, private authService: MsalService) { 
  }

  // Acquires and access token and then passes it to the API call
getAccessToken() : Observable< void | Msal.AuthResponse> {
  return from(this.authService.acquireTokenSilent(tokenRequest)
    .catch(error => {
      console.log("Silent token acquisition fails. Acquiring token using popup");
      console.log(error);
      // fallback to interaction when silent call fails
      return this.authService.acquireTokenPopup(tokenRequest)
        .then(tokenResponse => {
          console.log("access_token acquired: " + tokenResponse);
          return tokenResponse;
        }).catch(error => {
          console.log(error);
        });
    }));
  }

callApiWithAccessToken(token) : Observable<Array<Product>> {
  const headers = new Headers();
    const bearer = `Bearer ${token}`;
    headers.append("Authorization", bearer);
    const options = {
        method: "GET",
        headers : headers
      };

    return this._http.get<Array<Product>>(apiConfig.productListApi, {
        headers : {"Authorization" : bearer}
    });
  }
}
