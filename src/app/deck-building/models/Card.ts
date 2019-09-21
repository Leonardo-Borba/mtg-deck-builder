import { RawCard } from '../../services/Scryfall/Models/RawCard';
import { Format } from './FormatEnum';

export class Card {

    public croppedImage: string;
    public name: string;
    public manaCost: string[];
    public largeImage: string;
    public smallImage: string;
    public normalImage:string;
    public cardType:string;
    public legalities: Map<Format, boolean>;

    constructor(card: RawCard){

        this.croppedImage = this._getImage(card,"art_crop");
        this.largeImage = this._getImage(card, "large");
        this.smallImage = this._getImage(card, "small");
        this.normalImage = this._getImage(card, "normal");
        this.name = card.name;
        this.manaCost = this._convertManaCost(this._getManaCost(card));
        this.legalities = this._generateLegalities(card);
        this.cardType = card.type_line
        console.log(this)
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

    _generateLegalities(card: RawCard): Map<Format, boolean> {
        let legalities = new Map(Object.entries(card.legalities))
        let legals = [...legalities.keys()]
        let converted = new Map<Format, boolean>();
        legals.map(
            entry => {
                let fmt = Format[entry.toUpperCase()]
                let isLegal = legalities.get(entry) === "legal" ? true : false;
                converted.set(fmt, isLegal)
            }
        )
        return converted;
    }
}