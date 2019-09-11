import { DeckEntry } from './DeckEntry';
import { Card } from './Card';
import { Subject } from 'rxjs';

export class Deck {

  removeEntry(entry: DeckEntry): void {
    if(this.cardIsPresent(entry.card)){
        this.entries.delete(entry.card.name);
        this.alertChanges();
    }
  }
    private entries :Map<string,DeckEntry> = new Map();
    public $entries = new Subject<DeckEntry[]>()

    public addEntry(card: Card): void {
        let isPresent = this.cardIsPresent(card);
        if(isPresent){
            if(this.entries.get(card.name).quantity < 4)
            this.entries.get(card.name).quantity++;
        }
        else{
            this.entries.set(card.name, new DeckEntry(card))
        }
        this.alertChanges()
    }
    cardIsPresent(card: Card) {
        return this.entries.has(card.name);
    }

    private alertChanges(): void {
        this.$entries.next([...this.entries.values()])
    }

}