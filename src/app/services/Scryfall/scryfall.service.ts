import { Injectable } from '@angular/core';
import { FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Catalog } from './Models/Catalog';
import { EndPoint } from "./endpoint";
import { Observable, of } from 'rxjs';
import { map, debounceTime, switchMap, catchError } from "rxjs/operators";
import { RawCard } from './Models/RawCard';
import { Card } from '../../deck-building/models/Card';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root',
})
export class ScryfallService {


  private DEFAULT_DEBOUNCE: number = 400;

  constructor(private http: HttpClient) { }

  validateCard(card: string) {
    return this._getCardForExactName(card).pipe(
      switchMap(rawCard => of(new Card(rawCard))),
      catchError(err => { throw err })
    )
  }

  getAutoCompleteFor(search: FormControl): Observable<string[]> {
    return search.valueChanges.pipe(
      debounceTime(this.DEFAULT_DEBOUNCE),
      switchMap(
        result => this._autoCompleteRequest(result)
      )
    )
  }

  public getBulk(cardNames: string[]): Observable<Card[]> {
    return this.http.post<Catalog>(EndPoint.COLLECTION, this._generateBody(cardNames)).pipe(
      debounceTime(this.DEFAULT_DEBOUNCE),
      switchMap(
        rawCardList => 
          of((rawCardList.data as RawCard[]).map(
            rawCard => new Card(rawCard)
          )
        )
      )
    )
  }

  private _getCardForExactName(cardName: string): Observable<RawCard> {
    return this.http.get<RawCard>(EndPoint.NAMED + "?exact=" + cardName);
  }

  private _generateBody(names: string[]) {

    let itens = names.map(
      name => new Object({ "name": name })
    )
    return {
      "identifiers": itens
    }
  }

  private _autoCompleteRequest(cardName: string): Observable<string[]> {
    if (cardName)
      return this.http.get<Catalog>(EndPoint.AUTOCOMPLETE + "?q=" + cardName).
        pipe(
          map(response => response.data as string[])
        )
    return new Observable<string[]>();
  }

}
