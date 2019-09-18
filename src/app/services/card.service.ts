import { Injectable } from '@angular/core';
import { Card } from '../deck-building/models/Card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor() { }


  public canBeUnlimited(card: Card): boolean{
    if(card.cardType.toLocaleLowerCase().includes("basic land"))
      return true
    return false
  }

  validateQuantity(quantity: string, cardItem: Card): number {
    let canBUnlimited = this.canBeUnlimited(cardItem);
    let qty = Number(quantity)
    if(!canBUnlimited)
      if(qty > 4)
        return 4
    return quantity === undefined ? 1 : qty
  }
}
