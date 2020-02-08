import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedataService } from '../sharedata.service';
import { DataFormatService } from '../data-format.service';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/services/common.service';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { GridOptions } from 'ag-grid-community';


@Component({
  selector: 'app-inplay',
  templateUrl: './inplay.component.html',
  styleUrls: ['./inplay.component.scss']
})


export class InplayComponent implements OnInit,OnDestroy {
  
  gridOptions: GridOptions;
  columnDefs:any
  paginationPageSize:any;
  paginationSetPageSize;
  paginationNumberFormatter:any;
  rowData=[];
  headerHeight: number;
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: { sortable: boolean; resizable: boolean; };
  overlayNoRowsTemplate: string;
  overlayLoadingTemplate: string;
  
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

  betsTable: any;

  showRecentList: boolean = true;
  constructor(
    private commonservice:CommonService,
    private sharedata:SharedataService,
    private dataformat:DataFormatService,
    public notification :NotificationService,
    private router: Router) { 
      this.betsTable = {};
      this.gridOptions = {
      columnDefs: [
        {
          headerName: "Market",
          field: "market",
          width: 100
        },
        {
          headerName: "Settle Date",
          field: "settleDate",
          width: 100
        },
        
        {
          headerName: "Start Date",
          field: "startDate",
          sortable: true,
          width: 100,
        },
        {
          headerName: "Profit/Loss",
          field: "pnl",
          sortable: true,
          valueFormatter: balanceFormatter,
          cellStyle: {'font-weight':'bolder'},
          cellClass: function(params) { return (params.value > 0 ? 'profit':'loss')}
        }
      ]
    };
      function balanceFormatter(params){
        if(params.value==null){
         return "--";
        }else{
          var stringbalance=parseInt(params.value);
          var twodecimalvalue=stringbalance.toFixed(2);
          return twodecimalvalue;
        }
      }
      this.defaultColDef = {
        sortable: true,
        resizable: true
      };
    }

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
        console.log(this.inplayData, this.upcomingEvents)
    })
    this.recentpnldata();
  }
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  appcharge(SportbfId,TourbfId,matchId,marketId,mtBfId,bfId,hasbookmaker){
    // if(hasbookmaker==0){
      this.router.navigateByUrl('/fullmarket/'+SportbfId+'/'+TourbfId+'/'+matchId+'/'+marketId+'/'+mtBfId+'/'+bfId);
    // }else{
    //   var gamexurl="http://gamex.duoexchange.com/#/fullmarket/"+SportbfId+'/'+TourbfId+'/'+matchId+'/'+marketId+'/'+mtBfId+'/'+bfId;
    //   var access_token=this.commonservice.getToken();
    //   var urlparams={
    //     token:access_token
    //   }
    //   var finalurl = [gamexurl, $.param(urlparams)].join('?');
    //   // console.log(finalurl);
    //   window.open(finalurl,"_blank");
    // }
    // this.commonservice.AppCharges(matchId).subscribe(resp=>{
    //   console.log(resp);
    //   if(resp.status=="Success"){
    //     this.router.navigateByUrl('/fullmarket/'+SportbfId+'/'+TourbfId+'/'+matchId+'/'+marketId+'/'+mtBfId+'/'+bfId);
    //   }else{
    //     this.notification.error(resp.result);
    //   }
    // })
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

  recentpnldata(){
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
      // console.log(this.pnlData)
    })
  }

  showBetsTable(pnlData) {
    this.betsTable = pnlData;
    this.showRecentList = !this.showRecentList;
    console.log(pnlData);
    this.betsTable.matchName = pnlData.market.split('>')[1];
    this.rowData = [pnlData];
  }
  
  getStatus(pnl) {
    return parseInt(pnl) >= 0? 'Profit': 'Loss';
  }

  trackById(index, item) {
    return item.id;
  }
  
ngOnDestroy(){
  this.inplaydatanavigation.unsubscribe();
}

}
