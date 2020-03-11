import { Component,OnInit,HostListener,ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

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
      {headerName: 'Login Date Time', field: 'loginDatetime', width: 150,lockPosition:true,suppressNavigable:true},
      {headerName: 'Login Status', field: 'loginStatus', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Ip Address', field: 'ipaddress', sortable: true, width: 150},
      {headerName: 'ISP', field: 'isp', sortable: true, width: 100,cellStyle: {'font-weight':'bolder'},valueGetter: function(params) {if(params.data.isp==null){ return "--" }}},
      {headerName: 'City State Country', field: 'cityStateCountry', sortable: true, width: 150,valueGetter: function(params) {if(params.data.cityStateCountry==null){ return "--" }}}
    ]; 
   
    this.gridOptions.paginationPageSize=10;
    this.defaultColDef = {
      sortable: true,
      resizable: true
    };

    this.overlayLoadingTemplate =
      '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
      '<span class="ag-overlay-loading-center">NO DATA</span>';

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
    this.commonservice.activitylog().subscribe(resp =>{
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
