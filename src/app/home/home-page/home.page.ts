import { Component, OnInit, OnDestroy, ɵConsole } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from '../../AppState';
import { LoginRequest } from '../../login/login-effect/login.actions';
import { GetUser, UserIsLoggedin } from 'src/app/login/login-effect/loginLogout.reducers';
import { Product } from '../models/Product';
import { ProductList } from '../product-effect/products.reducers';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, OnDestroy {

  private s : Subscription;
  user$;
  isLoggedin : boolean;
  products : Product[];

  constructor( 
    public modalController: ModalController,
    private store: Store<AppState>
    ) {
  }

  ngOnInit() : void {
    this.store.select(UserIsLoggedin).subscribe((s) => {
      this.isLoggedin = s;
      if(this.isLoggedin) {
        this.user$ = this.store.select(GetUser);
    }
    });
}

  ionViewWillEnter() { 
    this.store.select(ProductList).subscribe((products) => {
      this.products = products;
    });
  }

  login() {
    this.store.dispatch(new LoginRequest());
  }

  ngOnDestroy() {
    if(this.s) {
      this.s.unsubscribe();
    }
  }
}
