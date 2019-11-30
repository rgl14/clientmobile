import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clientmobile';
  innerWidth: number;
  isLoggedin: boolean;
  sherry: string;
  availBal: string;
  cash: string;
  credit: string;
  exposure: string;
  fundsdata: any;

  constructor(private cookie:CookieService,private commonservice:CommonService) { }

  ngOnInit() {
    this.isLoggedin=this.cookie.check('charlie');
  }
  checkloggedin(event:any){
    this.isLoggedin=this.cookie.check('charlie');
  }
}
