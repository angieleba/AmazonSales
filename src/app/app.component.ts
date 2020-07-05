import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
import { BroadcastService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loginService : LoginService,
    private router : Router,
    private broadcastService: BroadcastService
  ) {
    this.initializeApp();
  }
  isIframe = false;
  ngOnInit() : void {
    this.isIframe = window !== window.parent && !window.opener;

    this.broadcastService.subscribe('msal:loginSuccess', () => {

    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.loginService.logout();
  }
}
