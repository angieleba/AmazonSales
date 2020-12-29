import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BroadcastService } from '@azure/msal-angular';
import { LoginService } from '../services/login.service';

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
