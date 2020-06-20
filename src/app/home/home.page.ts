import { Component, OnInit, OnDestroy, ɵConsole } from '@angular/core';
import { Product } from '../product/product.model';
import { Subscription } from 'rxjs';
import { HomeService } from './home.service';
import { LoginService } from '../login/login.service';
import { User } from '../login/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, OnDestroy {

  private s : Subscription;
  user : User;
  
  products : Product [];
  constructor(
    private _homeService : HomeService, 
    private _loginService : LoginService
    ) {
  }

  ngOnInit() : void {
  }

  ionViewWillEnter() {
    
    this.s = this._homeService.getProducts().subscribe(
      productList => {
        this.products = productList
      }, 
      err => {

      });
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
