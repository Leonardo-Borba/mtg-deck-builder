export class DeckParsingError implements Error{
    name: string;
    stack?: string;


    constructor(public index:number, public message: string) {

    }
} 