import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { MsalGuard } from '@azure/msal-angular';
import { LoginGuard } from '../login/login.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'my-profile', children : [
      {
        path : '',
        loadChildren: () => import('../profile/my-profile/my-profile.module').then(m => m.MyProfilePageModule),
        canLoad : [LoginGuard]
      }
    ]
    
  },
  {
    path: 'add-product',
    loadChildren: () => import('../product/new-product/new-product.module').then(m => m.NewProductPageModule),
    canLoad : [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
