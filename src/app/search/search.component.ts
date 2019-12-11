import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, toArray } from 'rxjs/operators';
import { from, Subscription } from 'rxjs';
import { DataFormatService } from '../data-format.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit ,OnDestroy {
  @ViewChild("search", { static: false }) search: ElementRef;
  searchField;
  searchResult: any= [];
  noMatching: boolean;
  allMatches: any = [];
  searchdata: Subscription;

  constructor(private dataformat:DataFormatService) { }

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
      this.searchdata=this.dataformat.navigationSource.subscribe(data=>{
        if(data!=null){
          this.searchResult=this.dataformat.searchMatchWise(data);
        }
      })
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

  ngOnDestroy(){
    this.searchdata.unsubscribe();
  }

}
