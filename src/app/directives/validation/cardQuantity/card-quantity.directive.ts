import { Directive, ElementRef, Input, OnInit, AfterContentInit } from '@angular/core';
import { DeckEntry } from 'src/app/deck-building/models/DeckEntry';
import { DeckService } from 'src/app/services/deck.service';
import { FormatValidationService } from 'src/app/services/format-validation.service';

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

  constructor(private element: ElementRef, private deckService: DeckService, private validService: FormatValidationService) { }

  private _setMax(native: any) {
    
    if(!this._cardCanBeUnlimited())
    {
      native.max = this.validService.getMaxQtyForFormat()
    }
  }
  private _cardCanBeUnlimited(): boolean {
    return this.validService.canBeUnlimited(this.entry.card)
  }

}
