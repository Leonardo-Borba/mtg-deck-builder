import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'manaLink'
})
export class ManaLinkPipe implements PipeTransform {


  transform(value: string): string {
     return `./assets/mana_symbols/${value}.svg`
  }

}
