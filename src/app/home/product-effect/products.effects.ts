import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { ProductListRequest, ProductListFailed, ProductListLoaded } from '../product-effect/products.actions';
import { mergeMap, map, catchError, concatMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/AppState';
import { ProductListStatuses } from './ProductListStatuses';
import { HomeService } from '../services/home.service';
import { Product } from '../models/Product';
import { AuthResponse } from 'msal';

@Injectable()
 export class ProductEffects {
     @Effect()
     products$ = this.actions$
     .pipe(
         ofType<ProductListRequest>(ProductListStatuses.Loading),
         mergeMap(action => this.homeService.getAccessToken()
         .pipe(
           mergeMap((token) => 
            this.homeService.callApiWithAccessToken((token as AuthResponse).accessToken).pipe(
              map(products => new ProductListLoaded(products))
            )
           ),
           catchError((error) => of(new ProductListFailed(error)))
         ))
      );

     constructor(private actions$: Actions, private store: Store<AppState>, 
      private homeService: HomeService ) { }
 }

