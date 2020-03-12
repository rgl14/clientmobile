import { Component, OnInit } from '@angular/core';
import { SharedataService } from '../sharedata.service';
import { DataFormatService } from '../data-format.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
  inplayData: any[];
  inplaydatanavigation: Subscription;

  constructor(private sharedata:SharedataService,private dataformat:DataFormatService,private router: Router) { }

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
    this.inplaydatanavigation=this.dataformat.navigationSource.subscribe(resp=>{
        this.inplayData=this.dataformat.inplaylistwise(resp,0);
        // console.log(this.inplayData);
    })
  }

  appcharge(SportbfId,TourbfId,matchId,marketId,mtBfId,bfId,hasbookmaker){
      this.router.navigateByUrl('/fullmarket/'+SportbfId+'/'+TourbfId+'/'+matchId+'/'+marketId+'/'+mtBfId+'/'+bfId);
  }
  identify(index,item){
    //do what ever logic you need to come up with the unique identifier of your item in loop, I will just return the object id.
    return item.marketId;
   }

  ngOnDestroy(){
    if(this.inplaydatanavigation){
      this.inplaydatanavigation.unsubscribe();
    }
  }

}
