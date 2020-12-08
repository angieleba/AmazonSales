import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';
import { NewProductComponent } from './product/new-product/new-product.component';
import { MyProfileComponent } from './profile/my-profile/my-profile.component';

const routes: Routes = [
  {
    path : 'login', component : LoginComponent
  },
  {
    path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'myProfile',
   component: MyProfileComponent
  },
  {
    path: 'addProduct',
    component: NewProductComponent
  }
  //,
  // {
  //   path: 'product-list',
  //   loadChildren: () => import('').then( m => m.ProductListPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
