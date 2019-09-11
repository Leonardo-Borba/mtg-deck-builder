import { Card } from './Card';

export class DeckEntry {

    quantity: number;
    card: Card;

    constructor(card: Card){
        this.card = card;
        this.quantity = 1
    }
}