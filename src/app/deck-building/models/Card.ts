import { RawCard } from '../../services/Scryfall/Models/RawCard';

export class Card {

    public croppedImage: string;
    public name: string;
    public manaCost: string[];
    public largeImage: string;
    public smallImage: string;
    public normalImage:string;
    public cardType:string;

    constructor(card: RawCard){

        this.croppedImage = this._getImage(card,"art_crop");
        this.largeImage = this._getImage(card, "large");
        this.smallImage = this._getImage(card, "small");
        this.normalImage = this._getImage(card, "normal");
        this.name = card.name;
        this.manaCost = this._convertManaCost(this._getManaCost(card));
        this.cardType = card.type_line
    }

    private _convertManaCost(mana_cost: string): string[] {
        return mana_cost.replace(/(\{|\})/g, " ").replace(/  /g," ").replace(/\/\//g, "").replace(/\//g, "").trim().replace(/\/\//g, "").split(" ")
    }

    _getImage(card: RawCard, size: string): string {
        if(this.isTransform(card)){
            return card.card_faces[0].image_uris[size]
        }
        return card.image_uris[size]
        
    }

    _getManaCost(card: RawCard): string {
        if(this.isTransform(card)){
            return card.card_faces[0].mana_cost
        }
        return card.mana_cost
    }

    private isTransform(card: RawCard): boolean{
        return card.layout.toLowerCase() === "transform"
    }

}