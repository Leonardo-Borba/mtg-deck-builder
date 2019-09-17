import { Directive, ElementRef, Input, OnInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { DeckEntry } from 'src/app/deck-building/models/DeckEntry';
import { CardService } from 'src/app/services/card.service';

@Directive({
  selector: '[cardQuantity]'
})
export class CardQuantityDirective implements OnInit, AfterContentInit {
  ngAfterContentInit(): void {
    this._setMax(this.native)
  }
  ngOnInit(): void {
    this.native = this.element.nativeElement;
    this.native.min = 1
  }

  @Input("cardQuantity")
  public entry: DeckEntry;

  private native: any;

  constructor(private element: ElementRef, private cardService: CardService) { }

  private _setMax(native: any) {
    
    if(!this._cardCanBeUnlimited())
    {
      native.max = 4
    }
  }
  private _cardCanBeUnlimited(): boolean {
    return this.cardService.canBeUnlimited(this.entry.card)
  }

}
