import { Component,OnInit,HostListener,ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { CommonService } from 'src/services/common.service';

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
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  date: Date;
  fromdate: string;
  todate: string;
  selectfromdate: string;
  selecttodate: string;

  constructor(private commonservice:CommonService) { 
    
    this.gridOptions = <GridOptions>{};
    this.headerHeight = 35;
    this.gridOptions.columnDefs = [
      {headerName: 'Date', field: 'date', width: 150,lockPosition:true,suppressNavigable:true},
      {headerName: 'Description', field: 'description', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'}},
      {headerName: 'Type', field: 'type', sortable: true, width: 150,cellStyle: {'font-weight':'bolder'},cellClass: function(params) { return (params.value == 'Back' ? 'back':'lay')}},
      {headerName: 'Credit', field: 'cr', sortable: true, width: 100,cellClass: function(params) { return  'profit'}},
      {headerName: 'Debit', field: 'dr', sortable: true, width: 100,cellClass: function(params) {  return  'loss'}},
      {headerName: 'Balance', field: 'balance', sortable: true, width: 100,cellStyle: {'font-weight':'bolder'},valueFormatter: balanceFormatter,cellClass: function(params) { return (params.value > 0 ? 'profit':'loss')}},
    ]; 

    function balanceFormatter(params){
      var stringbalance=parseInt(params.value);
      var twodecimalvalue=stringbalance.toFixed(2);
      return twodecimalvalue;
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
        var days = 1;
        var date = new Date();
        var last = new Date(date.getTime() - (days * 24 * 60 * 60 * 1000));
        this.date = last
        this.fromdate = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + (this.date.getDate()) + " 00:00:00";
        this.todate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " 23:59:00";
        let accountstatdates={
          "fromdate":this.fromdate,
          "todate":this.todate
        }
    this.commonservice.transactionstatement(accountstatdates).subscribe(resp =>{
      this.rowData=resp.data;
    })
  }

  transactstat(value){
    this.selectfromdate=this.convertfrom(value[0]);
    this.selecttodate=this.convertto(value[1]);
    console.log(this.selectfromdate,this.selecttodate);
     let accountstatdates={
       "fromdate":this.selectfromdate,
       "todate":this.selecttodate
     }
    //  this.commonservice.transactionstatement(accountstatdates).subscribe(resp =>{
    //    this.rowData=resp.data;
    //  })
     this.commonservice.GetCoinHistory().subscribe(resp =>{
      this.rowData=resp.data;
    })
   }
   convertfrom(str) {
     var date = new Date(str);
     return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate()) + " 00:00:00"
   }
   convertto(str) {
     var date = new Date(str);
     return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate()) + " 23:59:00"
   }
    // @ViewChild(BsDaterangepickerDirective, { static: false }) datepicker: BsDaterangepickerDirective;
    // @HostListener('window:scroll')
    // onScrollEvent() {
    //   this.datepicker.hide();
    // }

  ngOnInit() {
  }

}
