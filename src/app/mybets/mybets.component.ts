import { Component,OnInit,HostListener,ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';

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

  constructor() { 
    this.gridOptions = <GridOptions>{};
    this.headerHeight = 35;
    this.gridOptions.columnDefs = [
      {headerName: 'Bet id', field: 'betId', width: 75,lockPosition:true,suppressNavigable:true},
      {headerName: 'Market', field: 'market', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Selection', field: 'selection', sortable: true, width: 150},
      {headerName: 'Type', field: 'type', sortable: true, width: 100,cellStyle: {'font-weight':'bolder'},cellClass: function(params) { return (params.value == 'Back' ? 'back':'lay')}},
      {headerName: 'Bet Placed', field: 'betPlaced', sortable: true, width: 150},
      {headerName: 'Odds', field: 'avgOdds', sortable: true, width: 75},
      {headerName: 'Stake', field: 'stake', sortable: true, width: 75},
      {headerName: 'Profit/loss', field: 'pnl', sortable: true, width: 100,cellStyle: {'font-weight':'bolder'},cellClass: function(params) { return (params.value > 0 ? 'profit':'loss')}},
    ]; 

    this.gridOptions.rowData = [
      { avgOdds: "95", betId: 293883, betPlaced: "10/3/2019 4:58:59 PM", market: "Kabaddi > Telugu Titans v Puneri Paltan >BOOK MAKING", odds: "95", plId: "ritesh", pnl: "-100.00", selection: "Telugu Titans", stake: "100.00", type: "Back" },
      { avgOdds: "95", betId: 293883, betPlaced: "10/3/2019 4:58:59 PM", market: "Kabaddi > Telugu Titans v Puneri Paltan >BOOK MAKING", odds: "85", plId: "ritesh", pnl: "600.00", selection: "Telugu Titans", stake: "600.00", type: "Lay" },
    ];
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
