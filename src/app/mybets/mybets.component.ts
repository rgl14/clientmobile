import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-mybets',
  templateUrl: './mybets.component.html',
  styleUrls: ['./mybets.component.scss']
})
export class MybetsComponent implements OnInit {
  gridOptions: any;

  constructor() { 
    this.gridOptions = <GridOptions>{};
    this.gridOptions.columnDefs = [
      {headerName: 'ID', field: 'id', width: 100,lockPosition:true,suppressNavigable:true},
      // {headerName: 'Username', field: 'username', sortable: true, width: 200,cellRendererFramework:NavigationcellComponent,cellStyle: {color: '#0084e7','font-weight':'bolder'}},
      {headerName: 'Name', field: 'name', sortable: true, width: 150},
      {headerName: 'Fix Limit', field: 'fixlimit', sortable: true, width: 150},
      {headerName: 'My share', field: 'myshare', sortable: true, width: 100},
      {headerName: 'Max Share', field: 'maxshare', sortable: true, width: 100},
      {headerName: 'M-Comm', field: 'maxshare', sortable: true, width: 100},
      {headerName: 'S-Comm', field: 'maxshare', sortable: true, width: 100},
      // {headerName: 'Status', field: 'status', width: 100,cellRendererFramework:ButtontogglecellComponent},
      // {headerName: 'Bet Allow', field: 'status', width: 100,cellRendererFramework:ButtontogglecellComponent},
      // {headerName: 'Actions', field: '', width: 230,cellRendererFramework:CustomcellbuttonsComponent},
    ]; 

    this.gridOptions.rowData = [
      { id: '1', username: 'SST1', name: 'Dummy',fixlimit: '1%',myshare: '11%',maxshare:'89%',status:1 },
      { id: '2', username: 'SST2', name: 'Dummy',fixlimit: '1%',myshare: '12%',maxshare:'88%',status:1 },
      { id: '3', username: 'SST3', name: 'Dummy',fixlimit: '1%',myshare: '13%',maxshare:'87%',status:1 },
      { id: '4', username: 'SST4', name: 'Dummy',fixlimit: '1%',myshare: '14%',maxshare:'86%',status:1 },
      { id: '5', username: 'SST6', name: 'Dummy',fixlimit: '1%',myshare: '15%',maxshare:'85%',status:1 },
      { id: '6', username: 'SST16', name: 'Dummy',fixlimit: '1%',myshare: '19%',maxshare:'81%',status:1 },
      { id: '7', username: 'SST7', name: 'Dummy',fixlimit: '1%',myshare: '16%',maxshare:'84%',status:1 },
      { id: '8', username: 'SST8', name: 'Dummy',fixlimit: '1%',myshare: '17%',maxshare:'83%',status:1 },
      { id: '9', username: 'SST9', name: 'Dummy',fixlimit: '1%',myshare: '18%',maxshare:'82%',status:1 },
      { id: '10', username: 'SST10', name: 'Dummy',fixlimit: '1%',myshare: '19%',maxshare:'81%',status:1 },
      { id: '11', username: 'SST11', name: 'Dummy',fixlimit: '1%',myshare: '10%',maxshare:'90%',status:1 },
      { id: '12', username: 'SST12', name: 'Dummy',fixlimit: '1%',myshare: '9%',maxshare:'91%',status:1 },
      { id: '13', username: 'SST13', name: 'Dummy',fixlimit: '1%',myshare: '8%',maxshare:'92%',status:1 },
      { id: '14', username: 'SST14', name: 'Dummy',fixlimit: '1%',myshare: '5%',maxshare:'95%',status:1 },
      { id: '15', username: 'SST15', name: 'Dummy',fixlimit: '1%',myshare: '6%',maxshare:'94%',status:1 },
    ];
   }

  ngOnInit() {
  }

}
