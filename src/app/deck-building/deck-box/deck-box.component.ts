import { Component, OnInit, Input } from '@angular/core';

import { DeckEntry } from "src/app/deck-building/models/DeckEntry";
import { Format } from '../models/FormatEnum';
import { DeckService } from 'src/app/services/deck.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from 'src/app/shared/modal-dialog/modal-dialog.component';

@Component({
  selector: 'deckBox',
  templateUrl: './deck-box.component.html',
  styleUrls: ['./deck-box.component.less']
})
export class DeckBoxComponent implements OnInit {

  showModal = true;
  itensSize = 2;
  deckSize = 15;
  ngOnInit(): void {
    this.onResize()
    this.format.valueChanges.subscribe(
      format => this.changeFormat(format)
    )
    this.deckService.entries().subscribe(
      () => this.onResize()
    )
  }
  changeFormat(format: any): void {
    if(this.deckService.isDeckEmpty())
      this.deckService.updateFormat(format)
    else if(this.showModal){
      this.diag.open(ModalDialogComponent,{data: {
        title: `This will remove all entries from your deck`,
        accept: "Ok",
        reject: "Cancel"
      }}).afterClosed().subscribe(
        result => {
          if(result){
            this.deckService.removeAllEntries()
            this.deckService.updateFormat(format)
            this.showModal = true;
          }
          else{
            this.showModal = false;
            this.format.setValue(this.deckService.getFormat())
            this.showModal = true;
          }
        }
      )
    }

  }

  format = new FormControl()

  constructor(public deckService: DeckService, private diag: MatDialog) {}

  addCard(card: string) :void{
    this.deckService.addCard(card);
  }

  removeEntry(event: DeckEntry){
    this.deckService.removeEntry(event)
  }

  import(event: DeckEntry[]){
      this.deckService.replaceAllEntries(event)
  }

  getAvailableFormats(){
    return Object.keys(Format);
  }

  onResize(){
    if(window.innerWidth < 760){
      this.itensSize = 4;
      if(this.deckService.isDeckEmpty())
        this.deckSize = 4
      else
        this.deckSize = 15
    }
    else{
      this.itensSize = 2
      this.deckSize = 15
    }
  }
}
