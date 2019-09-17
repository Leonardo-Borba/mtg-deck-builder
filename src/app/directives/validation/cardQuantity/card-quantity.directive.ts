import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/deck-building/models/Card';

@Directive({
  selector: '[cardQuantity]'
})
export class CardQuantityDirective implements OnInit {
  ngOnInit(): void {
    let native = this.element.nativeElement;
    native.min = 1
    this._setMax(native);
  }

  @Input("cardQuantity")
  public card: Card;

  constructor(private element: ElementRef) { }

  private _setMax(native: any) {
    
    if(!this._cardCanBeUnlimited())
    {
      native.max = 4
    }
  }
  private _cardCanBeUnlimited(): boolean {
    if(this.card.cardType.toLocaleLowerCase().includes("basic land"))
      return true
    return false
  }

}
