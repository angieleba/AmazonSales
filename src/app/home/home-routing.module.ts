import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { MsalGuard } from '@azure/msal-angular';
import { LoginGuard } from '../login/login.guard';
import { NewProductComponent } from '../product/new-product/new-product.component';
import { MyProfileComponent } from '../profile/my-profile/my-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'my-profile', children : [
      {
        path : '',
        component: MyProfileComponent,
        canLoad : [LoginGuard]
      }
    ]
    
  },
  {
    path: 'add-product',
    component : NewProductComponent,
    canLoad : [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
