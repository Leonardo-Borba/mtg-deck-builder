export interface RawCard {
    name:string
    mana_cost:string;
    image_uris: {[key: string]:string}
    layout: string;
    card_faces: RawCard[];
}