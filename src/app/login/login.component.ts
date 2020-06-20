import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { BroadcastService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  isIframe = false;
  isAuthenticated = false;

  constructor(
    private loginService : LoginService, 
    private router: Router) {     
  }

  ngOnInit() {
   
  }

  login() {
   this.loginService.login();
  }

  public logout() {
    this.loginService.logout();
  }

 
 
}
