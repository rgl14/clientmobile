import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inplay',
  templateUrl: './inplay.component.html',
  styleUrls: ['./inplay.component.scss']
})
export class InplayComponent implements OnInit {
  @Output() someEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

}
