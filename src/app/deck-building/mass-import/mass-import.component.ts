import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DeckParsingError } from './DeckParsingError';
import { ScryfallService } from 'src/app/services/Scryfall/scryfall.service';
import { Card } from '../models/Card';
import { DeckEntry } from '../models/DeckEntry';
import { stringify } from '@angular/compiler/src/util';
import { MatDialog } from '@angular/material';
import { LoadingSpinnerComponent } from 'src/app/shared/loading-spinner/loading-spinner.component';
import { tap } from 'rxjs/operators';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'mass-import',
  templateUrl: './mass-import.component.html',
  styleUrls: ['./mass-import.component.less']
})
export class MassImportComponent implements OnInit {

  public massImport:string = `1x Adarkar Valkyrie
1x AEthermage's Touch
1x Akroma's Vengeance
1x Aminatou, the Fateshifter
1x Arcane Sanctum
1x Azorius Chancery
1 Azorius Guildgate
1x Azorius Signet
1 Barren Moor
1x Brainstorm
1x Command Tower
1x Commander's Sphere
1x Crib Swap`;

  @Output("importer")
  public importer: EventEmitter<DeckEntry[]> = new EventEmitter();

  constructor(private scryfall: ScryfallService, private matDialog: MatDialog, private cardService: CardService) { }

  public import(): void{

    this.matDialog.open(LoadingSpinnerComponent, { disableClose: true })

    let cardList: {name:string; quantity: string}[];
    try{
      cardList = this._parseMassImportList()
    }
    catch(error){
      //TO-DO: write error handling
    }
    this.scryfall.getBulk(
      cardList.map(
        item => item.name
      )
    ).pipe(
      tap( x => this.matDialog.closeAll())
    ).subscribe(
      finalCardList => this._emmitEvent(finalCardList, cardList)
    )

  }
  _emmitEvent(finalCardList: Card[], cardList: { name: string; quantity: string; }[]): void {

    let entries: DeckEntry[] = [];
    let entriesMap: Map<string, string> = this._convertEntriesToMap(cardList);
    finalCardList.forEach(
      cardItem => entries.push(new DeckEntry(cardItem, this.cardService.validateQuantity(entriesMap.get(cardItem.name), cardItem)))
    )
      this.importer.emit(entries);
  }

  _convertEntriesToMap(cardList: { name: string; quantity: string; }[]): Map<string, string> {
    let entriesMap= new Map<string, string>()

    cardList.forEach(
      cardItem => entriesMap.set(cardItem.name, cardItem.quantity)
    )

    return entriesMap;
  }
  _parseMassImportList() {

    let cardList: {name:string; quantity: string}[] = [];

    try {
      this.massImport.trim().split("\n").forEach(
        (item, index) => {
          let qtd = item.match(/\d+x?/);
          if(qtd != null){
            let quantity = qtd[0].replace("x", "");
            let cardName = item.replace(/\d+x?/, "").trim()
            cardList.push({name: cardName, quantity: quantity})
          }
          else
            throw new DeckParsingError(index, item)
        }
      ) 
    } catch (error) {
      console.log(error)
    }
    finally{
      return cardList;
    }
  }

  ngOnInit() {
  }

}
