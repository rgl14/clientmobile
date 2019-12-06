import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/services/common.service';
import { NotificationService } from '../shared/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedataService } from '../sharedata.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  fundsdata: any;
  availBal: number;
  cash: number;
  credit: number;
  exposure: number;
  state: any;
  uname: any;
  constructor(private commonservice:CommonService,public notification :NotificationService,private cookie:CookieService,private router: Router,private sharedata:SharedataService) { }

  ngOnInit() {
    this.commonservice.funds().subscribe(data=>{
      this.fundsdata=data.data;
      this.availBal=data.data.availBal;
      this.cash= data.data.cash;
      this.credit= data.data.credit;
      this.exposure= data.data.exposure;
      this.sharedata.userdescriptionSource.subscribe(resp=>{
        this.uname=resp.data.uName;
      })
    })
  }

  Logout(){
    this.commonservice.logout().subscribe(data =>{
      this.cookie.delete('charlie');
      this.notification.success(data.result);
      window.location.reload();
      // this.router.navigateByUrl("");
    })
  }

}
