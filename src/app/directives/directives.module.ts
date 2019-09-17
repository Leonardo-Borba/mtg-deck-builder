import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardImageDirective } from './card-image.directive';
import { CardToolTipDirective } from './cardTooltip/card-tool-tip.directive';
import { CardQuantityDirective } from './validation/cardQuantity/card-quantity.directive';



@NgModule({
  declarations: [CardImageDirective, CardToolTipDirective, CardQuantityDirective],
  imports: [
    CommonModule
  ],
  exports: [CardImageDirective, CardToolTipDirective, CardQuantityDirective]
})
export class DirectivesModule { }
