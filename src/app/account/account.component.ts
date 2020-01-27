import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from 'src/services/common.service';
import { NotificationService } from '../shared/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { SharedataService } from '../sharedata.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit,OnDestroy {
  fundsdata: any;
  availBal: number;
  cash: number;
  credit: number;
  exposure: number;
  state: any;
  uname: any;
  fundsdatasrc: Subscription;
  userdescsrc: Subscription;
  constructor(private commonservice:CommonService,public notification :NotificationService,private cookie:CookieService,private router: Router,private sharedata:SharedataService) { }

  ngOnInit() {
    this.fundsdatasrc=this.sharedata.fundSource.subscribe(resp=>{
      if(resp!=null){
        // console.log(resp)
        this.fundsdata=resp.data;
        this.availBal=resp.data.availBal;
        this.cash= resp.data.cash;
        this.credit= resp.data.credit;
        this.exposure= resp.data.exposure;
      }
    })
    this.userdescsrc=this.sharedata.userdescriptionSource.subscribe(resp=>{
      if(resp!=null){
        // console.log(resp);
        this.uname=resp.data.uName;
      }
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
  ngOnDestroy(){
    this.fundsdatasrc.unsubscribe();
    this.userdescsrc.unsubscribe();
  }

}
