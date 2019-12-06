import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpace'
})
export class RemoveSpacePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // console.log(value,args)
    return value.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '_');
  }

}