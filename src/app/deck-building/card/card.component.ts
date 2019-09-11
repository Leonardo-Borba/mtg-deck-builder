import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeckEntry } from '../models/DeckEntry';
import { MatDialog } from '@angular/material';
import { ModalDialogComponent } from 'src/app/shared/modal-dialog/modal-dialog.component';
import { DialogData } from 'src/app/shared/models/dialog-data';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {

  @Input()
  public entry: DeckEntry;

  @Output()
  public onRemove: EventEmitter<DeckEntry> = new EventEmitter()

  constructor(public dialog: MatDialog) { }

  remove(){

    const dialogData: DialogData = {
      title: `Remove ${this.entry.card.name}?`,
      accept: "Yes",
      reject: "No"
    }

    const diag = this.dialog.open(ModalDialogComponent, {
       data: dialogData
    })
    diag.afterClosed().subscribe(
      result => {
        if(result)
          this.onRemove.emit(this.entry)
      }
    )
  }

  ngOnInit() {

  }

}
