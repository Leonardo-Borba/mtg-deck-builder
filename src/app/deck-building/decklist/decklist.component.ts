import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DeckEntry } from '../models/DeckEntry';

@Component({
  selector: 'decklist',
  templateUrl: './decklist.component.html',
  styleUrls: ['./decklist.component.less']
})
export class DecklistComponent implements OnInit {

  @Input("entries")
  entries$: Subject<DeckEntry[]>

  @Output("remove")
  onRemove: EventEmitter<DeckEntry> = new EventEmitter<DeckEntry>()

  constructor() { }

  ngOnInit() {
  }

  removeEntry(entry: DeckEntry){

    this.onRemove.emit(entry)
  }
}
