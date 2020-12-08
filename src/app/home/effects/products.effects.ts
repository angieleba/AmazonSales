import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { ProductListRequest, ProductListFailed, ProductListLoaded } from '../actions/products.actions';
import { ProductListStatuses } from '../actions/ProductListStatuses';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Product } from 'src/app/product/product.model';
import { of } from 'rxjs/internal/observable/of';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/AppState';
import { LoginService } from 'src/app/login/login.service';
import { HomeService } from '../home.service';

@Injectable()
 export class ProductEffects {
     @Effect()
     products$ = this.actions$
     .pipe(
         ofType<ProductListRequest>(ProductListStatuses.Loading),
         mergeMap(() => this.homeService.getProductList()
         .pipe(
           map(products => {
             return (new ProductListLoaded(products as Array<Product>));
           }),
           catchError((error) => of(new ProductListFailed(error)))
         ))
      );

     constructor(private actions$: Actions, private store: Store<AppState>, 
      private homeService: HomeService ) { }
 }

