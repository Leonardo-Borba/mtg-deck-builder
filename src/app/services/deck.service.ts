import { Injectable } from '@angular/core';
import { Deck } from '../deck-building/models/Deck';
import { DeckEntry } from '../deck-building/models/DeckEntry';
import { Card } from '../deck-building/models/Card';
import { ScryfallService } from './Scryfall/scryfall.service';
import { Format } from '../deck-building/models/FormatEnum';
import { FormatValidationService } from './format-validation.service';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  private deck: Deck = new Deck();

  constructor(
    public scryfallService: ScryfallService, 
    private formatService: FormatValidationService) { }

  addCard(cardName: string) {
    this.scryfallService.validateCard(cardName).subscribe(
      card => this.addEntry(card),
      error => console.log(error)
    )
  }

  removeEntry(entry: DeckEntry): void {
    if (this.cardIsPresent(entry.card)) {
      this.deck.entries.delete(entry.card.name);
      this.alertChanges();
    }
  }

  public addEntry(card: Card): void {
    let isPresent = this.cardIsPresent(card);
    if (isPresent) {
      if (this.deck.entries.get(card.name).quantity < this.formatService.getMaxQtyForFormat() || this.formatService.canBeUnlimited(card))
        this.deck.entries.get(card.name).quantity++;
        this.deck.quantity++;
    }
    else {
      this.formatService.isCardValid(card);
      this.deck.entries.set(card.name, new DeckEntry(card))
      this.deck.quantity++;
    }
    this.alertChanges()
  }
  cardIsPresent(card: Card) {
    return this.deck.entries.has(card.name);
  }

  private alertChanges(): void {
    this._updateQuantity()
    if (this.deck.entries.size === 0)
      this.deck.$entries.next(undefined)
    else
      this.deck.$entries.next([...this.deck.entries.values()])
  }

  public replaceAllEntries(newEntries: DeckEntry[]) {
    this.removeAllEntries()
    newEntries.forEach(
      entry => {
        this.formatService.isCardValid(entry.card)
        this.deck.entries.set(entry.card.name, entry)
        this.alertChanges()
      }
    )
    this.alertChanges()
  }
  removeAllEntries() {
    this.deck.entries.clear()
    this.alertChanges()
  }
  private _updateQuantity() {
    let newQty = 0;
    this.deck.entries.forEach(
      entry => newQty = newQty + entry.quantity
    )
    this.deck.quantity = newQty;
  }

  public entries() {
    return this.deck.$entries
  }

  public updateFormat(format: Format) {
    this.deck.format = format
    this.formatService.setFormat(format)
  }

  public getFormat() {
    return this.deck.format;
  }

  public quantity(): number {
    return this.deck.quantity;
  }

  isFormatPresent(){
    return this.getFormat() != null;
  }

  isDeckEmpty(){
    return !(this.deck.entries.size > 0);
  }
}
