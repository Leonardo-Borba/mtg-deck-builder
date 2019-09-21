import { DeckEntry } from './DeckEntry';
import { Card } from './Card';
import { Subject } from 'rxjs';
import { Format } from './FormatEnum';

export class Deck {

    name: string;
    public entries :Map<string,DeckEntry> = new Map();
    public $entries = new Subject<DeckEntry[]>()
    public quantity: number = 0;
    public format: Format;
}