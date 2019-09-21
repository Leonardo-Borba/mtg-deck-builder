import { Injectable } from '@angular/core';
import { DeckService } from './deck.service';
import { Format } from '../deck-building/models/FormatEnum';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from '../shared/modal-dialog/modal-dialog.component';
import { Card } from '../deck-building/models/Card';

@Injectable({
  providedIn: 'root'
})
export class FormatValidationService {

  availableFormats = new Map(
    [
      [Format.COMMANDER, { singleton: true, cardQuantity: 100 }],
      [Format.STANDARD, { singleton: false, cardQuantity: 60 }],
      [Format.MODERN, { singleton: false, cardQuantity: 60 }],
      [Format.VINTAGE, { singleton: false, cardQuantity: 60 }],
      [Format.BRAWL, { singleton: true, cardQuantity: 60 }]
    ]
  )
  format: Format;

  constructor(private diag: MatDialog) { }

  public canBeUnlimited(card: Card): boolean {
    if (card.cardType.toLocaleLowerCase().includes("basic land"))
      return true
    return false
  }
  isCardValid(card: Card) {
    if (this.format === undefined) {
      this.showNoFormatError()
      throw "no format selected"
    }
    if (!card.legalities.get(this.format)) {
      this.showBannedCardError(card.name)
      throw "card not valid"
    }
  }
  isSingleton(format: Format) {
    return this.availableFormats.get(format).singleton
  }

  setFormat(format: Format) {
    this.format = format;
  }

  getMaxQtyForFormat(): number {
    let singleton = this.isSingleton(this.format);
    return singleton ? 1 : 4;
  }

  showNoFormatError() {
    this.diag.open(ModalDialogComponent, {
      data: {
        title: `Select a format first`,
        accept: "Ok",
        reject: "Cancel"
      }
    })
  }

  showBannedCardError(cardName: string) {
    this.diag.open(ModalDialogComponent, {
      data: {
        title: `The card ${cardName} is banned in ${this.format}`,
        accept: "Ok",
        reject: "Cancel"
      }
    })
  }

  validateQuantity(quantity: string, cardItem: Card): number {
    let canBUnlimited = this.canBeUnlimited(cardItem);
    let qty = Number(quantity)
    if(!canBUnlimited)
      if(qty > this.getMaxQtyForFormat())
        return this.getMaxQtyForFormat()
    return quantity === undefined ? 1 : qty
  }
}
