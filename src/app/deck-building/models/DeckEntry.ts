import { Card } from './Card';

export class DeckEntry {

    quantity: number;
    card: Card;

    constructor(card: Card, quantity?:number){
        this.card = card;
        this.quantity = quantity == undefined ? 1 : quantity
    }

}