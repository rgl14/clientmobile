import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedataService } from '../sharedata.service';
import { DataFormatService } from '../data-format.service';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/services/common.service';


@Component({
  selector: 'app-inplay',
  templateUrl: './inplay.component.html',
  styleUrls: ['./inplay.component.scss']
})


export class InplayComponent implements OnInit,OnDestroy {
  datahighlightwise: any;
  inplayData: any=[];
  upcomingEvents: any=[];
  inplaydatanavigation: Subscription;

  // swipe
  selectedIndex = 0;
  tabs = 3; 
  date: Date;
  fromdate: string;
  todate: string;
  pnlData: any=[];

  constructor(private commonservice:CommonService,private sharedata:SharedataService,private dataformat:DataFormatService) { }

  ngOnInit() {
    this.sharedata.userdatasource.subscribe(resp=>{
      if(resp!=null){
        // console.log(resp)
        // this.datahighlightwise=this.dataformat.NavigationFormat(resp.sportsData);
        // this.inplayData=this.dataformat.inplaylistwise(this.datahighlightwise,0)
        // this.upcomingEvents=this.dataformat.inplaylistwise(this.datahighlightwise,1)
        // console.log(this.inplayData)
      }
    })

    this.inplaydatanavigation=this.dataformat.navigationSource.subscribe(resp=>{
        this.inplayData=this.dataformat.inplaylistwise(resp,0);
        this.upcomingEvents=this.dataformat.inplaylistwise(resp,1);
        // console.log(this.inplayData)
    })

        var days = 7;
        var date = new Date();
        var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
        this.date = last
        this.fromdate = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + (this.date.getDate()) + " 00:00:00";
        this.todate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " 23:59:00";
        let pnldates={
          "fromdate":this.fromdate,
          "todate":this.todate
        }
    this.commonservice.marketprofitloss(pnldates).subscribe(resp =>{
      this.pnlData=resp.data;
      console.log(this.pnlData)
    })
  }
  
  onSwipe($event) {}
  tabChange($event) {}
  identify(index,item){
    //do what ever logic you need to come up with the unique identifier of your item in loop, I will just return the object id.
    return item.marketId;
   }
   Index(index,item){
    //do what ever logic you need to come up with the unique identifier of your item in loop, I will just return the object id.
    return index;
   }
ngOnDestroy(){
  this.inplaydatanavigation.unsubscribe();
}

}
