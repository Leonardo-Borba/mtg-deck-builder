import { Component, OnInit, Input } from '@angular/core';
import { ScryfallService } from 'src/app/services/Scryfall/scryfall.service';
import { Card } from 'src/app/deck-building/models/Card';
import { DeckEntry } from "src/app/deck-building/models/DeckEntry";
import { Deck } from '../models/Deck';

@Component({
  selector: 'deckBox',
  templateUrl: './deck-box.component.html',
  styleUrls: ['./deck-box.component.less']
})
export class DeckBoxComponent implements OnInit {
  
  deck: Deck = new Deck();
  ngOnInit(): void {
  }

  constructor(private scryService: ScryfallService) {}


  addCard(card: string) :void{

    this.scryService.validateCard(card).subscribe(
      card => this.addEntry(card),
      error => console.log(error)
    )
  }
  addEntry(card: Card): void {
    this.deck.addEntry(card)
  }

  removeEntry(event: DeckEntry){
    this.deck.removeEntry(event)
  }

}
