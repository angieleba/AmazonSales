import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {

  constructor(private modalController : ModalController) { }

  ngOnInit() {
  }

  ok() {
    console.log("Ok");
    }
    cancel() {
      this.modalController.dismiss();
    }
}
