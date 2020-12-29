import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home-page/home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { GreetingComponent } from './greeting/greeting.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [HomePage,
     GreetingComponent]

})
export class HomePageModule {}
