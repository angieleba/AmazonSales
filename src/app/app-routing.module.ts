import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login/login.guard';

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
    loadChildren: () => import('./profile/my-profile/my-profile.module').then( m => m.MyProfilePageModule)
  },
  {
    path: 'addProduct',
    loadChildren: () => import('./product/new-product/new-product.module').then( m => m.NewProductPageModule)
  },
  {
    path: 'product-list',
    loadChildren: () => import('./product/product-list/product-list.module').then( m => m.ProductListPageModule)
  },
  {
    path: 'new-product',
    loadChildren: () => import('./product/new-product/new-product.module').then( m => m.NewProductPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
