import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Product } from '../product/product.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private _http: HttpClient) { 
  }

  getProducts() {
    const url = environment.urlAPI + '/products';
    console.log(url);
    return this._http.get<Array<Product>>(url);
  }
}
