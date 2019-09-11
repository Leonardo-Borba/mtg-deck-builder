import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScryfallService } from 'src/app/services/Scryfall/scryfall.service';
import { FormControl } from "@angular/forms";
import { debounceTime, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'cardSearchBox',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
 
  constructor(private scryfall: ScryfallService) {}

  search = new FormControl();
  searchResult : Observable<string[]>;

  @Output()
  public selected = new EventEmitter<string>();

  ngOnInit() {
    this.registerEvents();
  }

  registerEvents(){
    this.setAutoComplete();
  }

  setAutoComplete() {
    this.searchResult = this.scryfall.getAutoCompleteFor(this.search)
  }

submit( event: any){
  if(event.key == "Enter" && this.search.value != ""){
    this.search.reset();
    this.selected.emit(event.target.value)
  }
}
  

}
