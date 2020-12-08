import { Component, OnInit, OnDestroy, ɵConsole } from '@angular/core';
import { Product } from '../product/product.model';
import { Subscription } from 'rxjs';
import { HomeService } from './home.service';
import { LoginService } from '../login/login.service';
import { User } from '../login/user.model';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from '../AppState';
import { ProductList } from './reducers/products.reducers';
import { LoginRequest } from '../login/actions/login.actions';
import { GetUser, UserIsLoggedin } from '../login/reducers/loginLogout.reducers';
import { NewProductComponent } from '../product/new-product/new-product.component';

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
  async openModal() {
    const modal = await this.modalController.create({
      component: NewProductComponent,
      // componentProps: {
      //   "paramTitle": "Insert product affiliate link"
      // }
    });

    return await modal.present();
  }
  test() {
    window.open("https://ionicframework.com/docs/v3/api/components/toolbar/Toolbar/", "_system");
  }

  ngOnDestroy() {
    if(this.s) {
      this.s.unsubscribe();
    }
  }
}
