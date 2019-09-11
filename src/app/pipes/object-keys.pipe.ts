import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectKeys'
})
export class ObjectKeysPipe implements PipeTransform {

  transform(value: any): string[] {
    if(value != null){
      console.log(Object.keys(value))
      return Object.keys(value);
    }
    return []
  }

}
