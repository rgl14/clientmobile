import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clientmobile';
  mode = new FormControl('push');
  innerWidth: number;
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth)
  }
}
