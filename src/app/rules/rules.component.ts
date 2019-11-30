import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/services/common.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  terms: any;
  rules: any;

  constructor(private commonservice:CommonService) { }

  ngOnInit() {
    this.commonservice.termsnconditions().subscribe(resp=>{
      console.log(resp)
      this.rules=resp.rules;
      this.terms=resp.terms;
    })
  }

}
