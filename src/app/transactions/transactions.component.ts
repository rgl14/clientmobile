import { Component,OnInit,HostListener,ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

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
      {headerName: 'Date', field: 'date', width: 150,lockPosition:true,suppressNavigable:true},
      {headerName: 'Description', field: 'description', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Type', field: 'type', sortable: true, width: 150,cellStyle: {'font-weight':'bolder'},cellClass: function(params) { return (params.value == 'Back' ? 'back':'lay')}},
      {headerName: 'Credit', field: 'cr', sortable: true, width: 100,cellClass: function(params) { return  'profit'}},
      {headerName: 'Debit', field: 'dr', sortable: true, width: 100,cellClass: function(params) {  return  'loss'}},
      {headerName: 'Balance', field: 'balance', sortable: true, width: 100,cellStyle: {'font-weight':'bolder'},cellClass: function(params) { return (params.value > 0 ? 'profit':'loss')}},
    ]; 

    this.gridOptions.rowData = [
      {"balance":"11089.00","cr":"10000.00","date":"11-16-2019 5:27:33 PM","description":"Deposit chips by demodl","dr":"-","refId":26114,"type":"D|W Point"},
      {"balance":"11089.00","cr":"10000.00","date":"11-16-2019 5:27:33 PM","description":"Deposit chips by demodl","dr":"-","refId":26114,"type":"D|W Point"},
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
