import { Pipe, PipeTransform } from "@angular/core";
import _ from "lodash";
import { DataFormatService } from './data-format.service';

@Pipe({
  name: "sortByDate",
  pure: true
})
export class SortByDatePipe implements PipeTransform {
  constructor(private datewise: DataFormatService) {}

  transform(array: any[], args: string): any {
    // console.log(array, args);
    if (typeof args[0] === "undefined") {
      return array;
    }
    array = _.sortBy(array, (a: any, b: any) => {
      return new Date(this.datewise.customDateFormat(a.matchDate));
    });
    return array;
  }
}