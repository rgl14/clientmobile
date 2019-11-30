import { Component, OnInit } from '@angular/core';
import { SharedataService } from '../sharedata.service';
import { DataFormatService } from '../data-format.service';

@Component({
  selector: 'app-inplay',
  templateUrl: './inplay.component.html',
  styleUrls: ['./inplay.component.scss']
})
export class InplayComponent implements OnInit {
  datahighlightwise: any;
  inplayData: any=[];
  upcomingEvents: any=[];
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
    this.dataformat.navigationSource.subscribe(resp=>{
      // this.datahighlightwise=this.dataformat.NavigationFormat(resp.sportsData);
        this.inplayData=this.dataformat.inplaylistwise(resp,0)
        this.upcomingEvents=this.dataformat.inplaylistwise(resp,1)
        // console.log(this.inplayData)
        // console.log(this.upcomingEvents)

    })
  }


}
