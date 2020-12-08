import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Product } from '../product/product.model';
import { throwError, of, Observable } from 'rxjs';
import { tokenRequest, apiConfig } from '../configuration';
import * as Msal from "msal";
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private productList : Observable<Product[]>;
  constructor(private _http: HttpClient, private authService: MsalService) { 
  }

  // Acquires and access token and then passes it to the API call
getProductList() : Observable<Product[]> {
  this.getTokenPopup(tokenRequest)
    .then(tokenResponse => {
        var response = tokenResponse as Msal.AuthResponse;
        console.log("access_token acquired at: " + new Date().toString());
        try {
          console.log("Request made to Web API:", response.accessToken);       
          return this.callApiWithAccessToken(apiConfig.webApi, response.accessToken);
        } catch(err) {
          return throwError(err);
        }
      });
      return of(new Array<Product>());
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

callApiWithAccessToken(endpoint, token) : Observable<Product[]> {
  const headers = new Headers();
  const bearer = `Bearer ${token}`;
  headers.append("Authorization", bearer);

  const options = {
      method: "GET",
      headers : headers
    };

  fetch(endpoint, options)
    .then(response => {
      // Array<Product> products = JSON.parse(response.result);
      return of(new Array<Product>());
      //console.log("Web API returned:" + JSON.stringify(response));
    }).catch(error => {
      console.log("Error calling the Web api:\n" + error);
      return throwError(error);
    });

    return of(new Array<Product>());
  }
}
