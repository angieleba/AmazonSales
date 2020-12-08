import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { ProductitemComponent } from '../product/productitem/productitem.component';
import { GreetingComponent } from './greeting/greeting.component';
import { NewProductComponent } from '../product/new-product/new-product.component';
import { MyProfileComponent } from '../profile/my-profile/my-profile.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, ProductitemComponent, GreetingComponent, NewProductComponent, MyProfileComponent]

})
export class HomePageModule {}
