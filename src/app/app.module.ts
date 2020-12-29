import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MsalModule, MsalAngularConfiguration, MsalInterceptor, MSAL_CONFIG, MSAL_CONFIG_ANGULAR, MsalService} from '@azure/msal-angular';
import { Configuration } from 'msal/lib-commonjs/Configuration';
import { msalConfig, loginRequest } from './configuration';
import {StoreModule, StoreRootModule} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HomePageModule } from './home/home.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './index.reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login/login.component';
import { LoginEffects } from './login/login-effect/login.effects';
import { LogoutEffects } from './login/login-effect/logout.effects';
import { ProductEffects } from './home/product-effect/products.effects';

function MSALConfigFactory(): Configuration {
  return msalConfig;
}


function MSALAngularConfigFactory(): MsalAngularConfiguration {
return loginRequest;
}

@NgModule({
  declarations: [AppComponent, LoginComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    MsalModule,
    HomePageModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([LoginEffects, LogoutEffects, ProductEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_CONFIG,
      useFactory: MSALConfigFactory
    },
    {
      provide: MSAL_CONFIG_ANGULAR,
      useFactory: MSALAngularConfigFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
