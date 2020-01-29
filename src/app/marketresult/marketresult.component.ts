import { Component,OnInit,HostListener,ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { CommonService } from 'src/services/common.service';

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
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  innerHeight: number;

  constructor(private commonservice:CommonService) { 
    this.gridOptions = <GridOptions>{};
    this.headerHeight = 35;
    this.gridOptions.columnDefs = [
      {headerName: 'Event Name', field: 'eventName', sortable: true, width: 300,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Market Name', field: 'marketName', sortable: true, width: 150},
      {headerName: 'Settled Time', field: 'settledTime', sortable: true, width: 150},
      {headerName: 'Winner', field: 'winner', sortable: true, width: 150,valueGetter: function(params) {if(params.data.winner==""){ return "--" }else{return params.data.winner}},cellStyle: {'font-weight':'bolder'},cellClass: function(params) { return 'profit'}},
    ];
   
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
    this.commonservice.marketresult().subscribe(resp =>{
      this.rowData=resp.data;
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
