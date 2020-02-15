import { Component,OnInit,HostListener,ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-mybets',
  templateUrl: './mybets.component.html',
  styleUrls: ['./mybets.component.scss']
})
export class MybetsComponent implements OnInit {
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
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  date: Date;
  fromdate: string;
  todate: string;
  selectfromdate: string;
  selecttodate: string;
  innerHeight: number;

  constructor(private commonservice:CommonService) { 
    
    this.gridOptions = <GridOptions>{};
    this.headerHeight = 35;
    this.gridOptions.columnDefs = [
      {headerName: 'Bet id', field: 'betId', width: 75,lockPosition:true,suppressNavigable:true},
      {headerName: 'Market', field: 'matchName', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Selection', field: 'selection', sortable: true, width: 150},
      {headerName: 'Type', field: 'type', sortable: true, width: 100,cellStyle: {'font-weight':'bolder'},cellClass: function(params) { return (params.value == 'Back' ? 'back':'lay')}},
      {headerName: 'Bet Placed', field: 'placedDate', sortable: true, width: 150},
      {headerName: 'Odds', field: 'avgOdds', sortable: true, width: 75},
      {headerName: 'Stake', field: 'matchedStake', sortable: true, width: 75},
      {headerName: 'Profit/loss', field: 'pnl', sortable: true, width: 100,cellStyle: {'font-weight':'bolder'},valueFormatter: balanceFormatter,cellClass: function(params) { return (params.value >= 0 ? 'profit':'loss')}},
    ]; 

    function balanceFormatter(params){
      // console.log(params);
      var rowvalue=params.data;
      var stringstake=parseFloat(rowvalue.matchedStake);
      if(rowvalue.type=="Back" || rowvalue.type=="Lay"){
        var stringavgOdds=parseFloat(rowvalue.odds)-1;
        var pnlvalue=stringavgOdds*stringstake;
      }else{
        var splitodds=rowvalue.odds.split('@')
        var stringavgOdds=parseFloat(splitodds[1])/100;
        var pnlvalue=stringavgOdds*stringstake;
      }
      // console.log(stringstake,stringavgOdds)
      var twodecimalvalue=pnlvalue.toFixed(2);
      return twodecimalvalue.toString();
    }

    this.gridOptions.paginationPageSize=10;
    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    "<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">No Rows To Display</span>";

    this.gridOptions.paginationNumberFormatter = function(params) {
      return "[" + params.value.toLocaleString() + "]";
    };
   }

   

   onPageSizeChanged(newPageSize:any) {
    var value = (document.getElementById('page-size') as HTMLInputElement).value;
    this.gridOptions.api.paginationSetPageSize(Number(value));
  }

  onFilterTextBoxChanged() {
    this.gridOptions.api.setQuickFilter((document.getElementById('filter-text-box') as HTMLInputElement).value);
  }
  onGridReady(params:any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.showLoadingOverlay();
    this.commonservice.mybets().subscribe(resp =>{
      this.rowData=resp.matchedbets;
    })
  }
    // @ViewChild(BsDaterangepickerDirective, { static: false }) datepicker: BsDaterangepickerDirective;
    // @HostListener('window:scroll')
    // onScrollEvent() {
    //   this.datepicker.hide();
    // }

  ngOnInit() {
    this.innerHeight=window.innerHeight;
  }

}
