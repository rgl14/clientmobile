import { Component,OnInit,HostListener,ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { CustomcellrendrerComponent } from '../customcellrendrer/customcellrendrer.component';
import { CommonService } from 'src/services/common.service';

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
  overlayLoadingTemplate: string;
  overlayNoRowsTemplate: string;
  date: Date;
  todate: string;
  fromdate: string;
  selectfromdate: string;
  selecttodate: string;

  constructor(private commonservice:CommonService) { 
    this.gridOptions = <GridOptions>{};
    this.headerHeight = 35;
    this.gridOptions.columnDefs = [
      {headerName: 'Market', field: 'market', sortable: true, width: 200,cellStyle: {'font-weight':'bolder'},cellRendererFramework:CustomcellrendrerComponent},
      {headerName: 'Start Date', field: 'startDate', sortable: true, width: 150},
      {headerName: 'Settle Date', field: 'settleDate', sortable: true, width: 150},
      {headerName: 'Profit/loss', field: 'pnl', sortable: true, width: 100,cellStyle: {'font-weight':'bolder'},cellClass: function(params) { return (params.value > 0 ? 'profit':'loss')}},
    ];

    this.overlayLoadingTemplate =
    '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>';
    this.overlayNoRowsTemplate =
    "<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">No Rows To Display</span>";

    
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
    this.gridApi.showLoadingOverlay();
    var days = 1;
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
      this.rowData=resp.data;
    })
  }
  profitandloss(value){
    this.selectfromdate=this.convertfrom(value[0]);
    this.selecttodate=this.convertto(value[1]);
    console.log(this.selectfromdate,this.selecttodate);
     let pnldates={
       "fromdate":this.selectfromdate,
       "todate":this.selecttodate
     }
     this.commonservice.marketprofitloss(pnldates).subscribe(resp =>{
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
