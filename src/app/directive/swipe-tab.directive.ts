import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[swipeTab]'
})
export class SwipeTabDirective {

  @Input() tabs: number;
  @Input() selectedIndex: number;
  @Output() selectedIndexChange = new EventEmitter<number>();

  @HostListener('swipeleft', ['$event'])
  onSwipeLeft(event) {
    console.log(event);
    
    if (this.selectedIndex + 1 <= this.tabs - 1) {
      this.selectedIndex += 1;
      this.selectedIndexChange.emit(this.selectedIndex);
    }
  }

  @HostListener('swiperight', ['$event'])
  onSwiperight(event) {
    console.log(event);
    if (this.selectedIndex - 1 >= 0) {
      this.selectedIndex -= 1;
      this.selectedIndexChange.emit(this.selectedIndex);
    }
  }

  constructor() { }

}
