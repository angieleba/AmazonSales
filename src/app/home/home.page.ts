import { Component, OnInit, OnDestroy, ɵConsole } from '@angular/core';
import { Product } from '../product/product.model';
import { Subscription } from 'rxjs';
import { HomeService } from './home.service';
import { LoginService } from '../login/login.service';
import { User } from '../login/user.model';
import { ModalController } from '@ionic/angular';
import { NewProductPage } from '../product/new-product/new-product.page';

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
    public modalController: ModalController
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

  async openModal() {
    const modal = await this.modalController.create({
      component: NewProductPage,
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
