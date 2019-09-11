import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardImageDirective } from './card-image.directive';
import { CardToolTipDirective } from './cardTooltip/card-tool-tip.directive';



@NgModule({
  declarations: [CardImageDirective, CardToolTipDirective],
  imports: [
    CommonModule
  ],
  exports: [CardImageDirective, CardToolTipDirective]
})
export class DirectivesModule { }
