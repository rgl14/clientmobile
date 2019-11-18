import { Component,OnInit,HostListener,ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { CustomcellrendrerComponent } from '../customcellrendrer/customcellrendrer.component';

@Component({
  selector: 'app-profitloss',
  templateUrl: './profitloss.component.html',
  styleUrls: ['./profitloss.component.scss']
})
export class ProfitlossComponent implements OnInit {

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

  constructor() { 
    this.gridOptions = <GridOptions>{};
    this.headerHeight = 35;
    this.gridOptions.columnDefs = [
      {headerName: 'Market', field: 'market', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'},cellRendererFramework:CustomcellrendrerComponent},
      {headerName: 'Start Date', field: 'startDate', sortable: true, width: 150},
      {headerName: 'Settle Date', field: 'settleDate', sortable: true, width: 150},
      {headerName: 'Profit/loss', field: 'pnl', sortable: true, width: 100,cellStyle: {'font-weight':'bolder'},cellClass: function(params) { return (params.value > 0 ? 'profit':'loss')}},
    ]; 

    this.gridOptions.rowData = [
      {"bets":{"backTotal":"-100","comm":"0","data":[{"betId":0,"odds":"2.16","placed":"11-17-2019 1:33:44 PM","pnl":"-100.00","score":null,"selection":"Durban Heat","stake":"100","type":"BACK"}],"layTotal":"0","mktTotal":"-100.00","netMktTotal":"-100","totalStakes":null},"market":"Cricket > Durban Heat v Cape Town Blitz > Match Odds","pnl":-100.00,"settleDate":"11-17-2019 5:15:54 PM","startDate":"11-17-2019 1:30:00 PM"},
      {"bets":{"backTotal":"-100","comm":"0","data":[{"betId":0,"odds":"2.16","placed":"11-16-2019 5:21:08 PM","pnl":"-100.00","score":null,"selection":"Bangla Tigers","stake":"100","type":"BACK"}],"layTotal":"0","mktTotal":"-100.00","netMktTotal":"-100","totalStakes":null},"market":"Cricket > Bangla Tigers v Deccan Gladiators > Match Odds","pnl":-100.00,"settleDate":"11-16-2019 6:48:50 PM","startDate":"11-16-2019 5:00:00 PM"}
   ]
    this.gridOptions.paginationPageSize=10;
    this.defaultColDef = {
      sortable: true,
      resizable: true
    };
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
  }
    // @ViewChild(BsDaterangepickerDirective, { static: false }) datepicker: BsDaterangepickerDirective;
    // @HostListener('window:scroll')
    // onScrollEvent() {
    //   this.datepicker.hide();
    // }

  ngOnInit() {
  }

}
