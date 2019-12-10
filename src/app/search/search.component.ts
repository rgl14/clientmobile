import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, toArray } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild("search", { static: false }) search: ElementRef;
  searchField;
  searchResult: [] = [];
  noMatching: boolean;
  allMatches: any = [];

  constructor() { }

  ngOnInit() {

    this.searchField = new FormControl("");

    this.searchField.valueChanges
      .pipe(
        filter(term => term && term !== null && term !== undefined),
        map((term: string) => term.trim().toLowerCase()),
        switchMap(term => from(this.searchEntries(term)).pipe(toArray()))
      )
      .subscribe((result: []) => {
        this.searchResult = result;
        this.searchResultShow();
        console.log("search result", typeof result, this.searchResult);
      });
  }

  private searchEntries(term) {
    let searchMatchlist = [];
    if (term) {
      this.allMatches.forEach((match: any) => {
        if (
          match.matchName.toLowerCase().indexOf(term) != -1 ||
          match.sportName.toLowerCase().indexOf(term) != -1
        ) {
          searchMatchlist.push(match);
        }
      });
      if (term && !searchMatchlist.length) {
        this.noMatching = true;
      } else {
        this.noMatching = false;
      }
      return searchMatchlist;
    } else return [];
  }
  
  openSearchWrap() {
    $("#searchWrap").fadeIn();
    this.search.nativeElement.focus();
  }

  searchWrapHide() {
    $("#searchWrap").fadeOut(400);
    this.searchField.reset();
    this.searchResult = [];
  }

  searchResultHide() {
    $("#searchResult").hide();
  }

  searchResultShow() {
    $("#searchResult").show();
  }

  trackByFn(index) {
    return index;
  }

}
