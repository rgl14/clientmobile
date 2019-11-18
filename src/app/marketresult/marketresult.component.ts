import { Component,OnInit,HostListener,ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-marketresult',
  templateUrl: './marketresult.component.html',
  styleUrls: ['./marketresult.component.scss']
})
export class MarketresultComponent implements OnInit {

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
      {headerName: 'Event Name', field: 'eventName', sortable: true, width: 300,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Market Name', field: 'marketName', sortable: true, width: 150},
      {headerName: 'Settled Time', field: 'settledTime', sortable: true, width: 150},
      {headerName: 'Winner', field: 'winner', sortable: true, width: 150,cellStyle: {'font-weight':'bolder'},cellClass: function(params) { return 'profit'}},
    ]; 

    this.gridOptions.rowData = [
      {"eventName":"Tennis > Bonadio v Gabashvili","marketName":"Match Odds","settledTime":"2019-11-18 20:30:00","winner":"Deccan Gladiators"},
      {"eventName":"Cricket > Deccan Gladiators v Karnataka Tuskers","marketName":"Match Odds","settledTime":"2019-11-18 17:00:00","winner":"Deccan Gladiators"}
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
