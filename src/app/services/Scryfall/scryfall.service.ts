import { Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Catalog } from './Models/Catalog';
import { EndPoint } from "./endpoint";
import { Observable, of } from 'rxjs';
import { map, debounceTime, switchMap, catchError } from "rxjs/operators";
import { RawCard } from './Models/RawCard';
import { Card } from '../../deck-building/models/Card';

@Injectable({
  providedIn: 'root',
})
export class ScryfallService {


  validateCard(card: string) {
    return this._getCardForExactName(card).pipe(
      switchMap( rawCard => of(new Card(rawCard))),
      catchError(err => {throw err})
    )
  }

  DEFAULT_DEBOUNCE: number = 400;

  constructor(private http: HttpClient) { }  

  getAutoCompleteFor(search: FormControl): Observable<string[]> {
    return search.valueChanges.pipe(
      debounceTime(this.DEFAULT_DEBOUNCE),
      switchMap(
        result => this._autoCompleteRequest(result)
      )
   )
  }

  _getCardForExactName(cardName:string): Observable<RawCard> {
    return this.http.get<RawCard>(EndPoint.NAMED + "?exact=" + cardName);
  }

  _autoCompleteRequest(cardName: string) : Observable<string[]>{
    if(cardName)
      return this.http.get<Catalog>(EndPoint.AUTOCOMPLETE+"?q="+cardName).
      pipe(
        map( response => response.data)
      )
    return new Observable<string[]>();
  }
 
}
