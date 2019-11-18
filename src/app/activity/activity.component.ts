import { Component,OnInit,HostListener,ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';

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

  constructor() { 
    this.gridOptions = <GridOptions>{};
    this.headerHeight = 35;
    this.gridOptions.columnDefs = [
      {headerName: 'Login Date Time', field: 'loginDatetime', width: 75,lockPosition:true,suppressNavigable:true},
      {headerName: 'Login Status', field: 'loginStatus', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Ip Address', field: 'ipaddress', sortable: true, width: 150},
      {headerName: 'ISP', field: 'isp', sortable: true, width: 100,cellStyle: {'font-weight':'bolder'},cellClass: function(params) { return (params.value == 'Back' ? 'back':'lay')}},
      {headerName: 'City State Country', field: 'cityStateCountry', sortable: true, width: 150}
    ]; 

    this.gridOptions.rowData = [
      {"cityStateCountry":null,"ipaddress":"162.158.227.48","isp":null,"loginDatetime":"2019-06-29 16:32:26","loginStatus":"Login Successful"},
      {"cityStateCountry":null,"ipaddress":"162.158.227.48","isp":null,"loginDatetime":"2019-06-29 16:45:42","loginStatus":"Login Successful"},
      {"cityStateCountry":null,"ipaddress":"162.158.227.46","isp":null,"loginDatetime":"2019-06-29 16:45:57","loginStatus":"Login Successful"}
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
