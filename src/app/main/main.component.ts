import { Component, OnInit, EventEmitter, Output } from '@angular/core';
// import {FormControl} from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import { CommonService } from 'src/services/common.service';
import { SharedataService } from '../sharedata.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  // mode = new FormControl('push');
  innerWidth: number;
  isLoggedin: boolean;
  fundsdata: any;
  availBal: any;
  cash: any;
  credit: any;
  exposure: any;
  userdata: any;
  state: any;
  constructor(private cookie:CookieService,private commonservice:CommonService,private sharedata:SharedataService) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.commonservice.userdescription().subscribe(data =>{
      this.userdata=data.data;
      this.sharedata.shareuserdescriptiondata(data);
    })
    this.commonservice.getuserdata().subscribe(data=>{
      console.log(data)
    })
    this.commonservice.funds().subscribe(data=>{
      this.sharedata.sharefundsdata(data);
      this.fundsdata=data;
      this.availBal=data.data.availBal;
      this.cash= data.data.cash;
      this.credit= data.data.credit;
      this.exposure= data.data.exposure;
    })
  }

}
