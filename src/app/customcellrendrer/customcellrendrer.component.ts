import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customcellrendrer',
  templateUrl: './customcellrendrer.component.html',
  styleUrls: ['./customcellrendrer.component.scss']
})
export class CustomcellrendrerComponent implements OnInit {
  data:any;
  constructor() { }

  agInit(params:any){
    // console.log(params)
    this.data=params.data;
  }

  ngOnInit() {
  }

}
