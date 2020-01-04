import { Component, OnInit } from '@angular/core';
import { SharedataService } from '../sharedata.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  fundsdata: any;
  state: any;
  userdesc: any;
  balance: any;
  exposure: any;

  constructor(private sharedata:SharedataService) { }

  ngOnInit() {
    this.sharedata.userdescriptionSource.subscribe(resp=>{
      if(resp!=null){
        this.userdesc=resp.data.uName
      }
    })
    this.sharedata.fundSource.subscribe(resp=>{
      if(resp!=null){
        this.balance=resp.data.availBal;
        this.exposure=resp.data.exposure;
      }
    })
  }

}
