import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  constructor(private iab: Platform) { }
 
  ngOnInit() {
  }

  test() {
    console.log("test");
    // this.iab.ready().then(() => {
    //    cordova.InAppBrowser.open("https://keep.google.com/u/0/#home", "_system", "localtion=true");
    // });
    window.open("https://keep.google.com/u/0/#home", '_system');
  }

}
