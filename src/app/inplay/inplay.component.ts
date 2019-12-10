import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedataService } from '../sharedata.service';
import { DataFormatService } from '../data-format.service';
import { Subscription } from 'rxjs';

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

  constructor(private sharedata:SharedataService,private dataformat:DataFormatService) { }

  ngOnInit() {
    this.sharedata.userdatasource.subscribe(resp=>{
      if(resp!=null){
        // console.log(resp)
        // this.datahighlightwise=this.dataformat.NavigationFormat(resp.sportsData);
        // this.inplayData=this.dataformat.inplaylistwise(this.datahighlightwise,0)
        // this.upcomingEvents=this.dataformat.inplaylistwise(this.datahighlightwise,1)
      }
    })
    this.inplaydatanavigation=this.dataformat.navigationSource.subscribe(resp=>{
        this.inplayData=this.dataformat.inplaylistwise(resp,0);
        this.upcomingEvents=this.dataformat.inplaylistwise(resp,1);
    })
  }
  
  onSwipe($event) {}
  tabChange($event) {}
  identify(index,item){
    //do what ever logic you need to come up with the unique identifier of your item in loop, I will just return the object id.
    return item.marketId;
   }
ngOnDestroy(){
  this.inplaydatanavigation.unsubscribe();
}

}
