import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { Product } from '../product.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-productitem',
  templateUrl: './productitem.component.html',
  styleUrls: ['./productitem.component.scss'],
})
export class ProductitemComponent implements OnInit {

  @Input() product: Product;
  safeUrl: any;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    //this.safeUrl = this.sanitizer.sanitize(SecurityContext.URL, "//rcm-eu.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=angieleba-21&language=it_IT&o=29&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B0728F7RMF&linkId=3f32056857af0f12a4e55041228862a1");
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl("//rcm-eu.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=angieleba-21&language=it_IT&o=29&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B0728F7RMF&linkId=3f32056857af0f12a4e55041228862a1");
    console.log("========>",this.safeUrl);
  }

  openUrl() {
    window.open("https://forum.ionicframework.com/t/how-to-create-a-hyperlink-that-can-be-opened-in-both-ios-and-android/105808/6", '_system');
  }
}
