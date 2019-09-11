import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mana-cost',
  templateUrl: './mana-cost.component.html',
  styleUrls: ['./mana-cost.component.less']
})
export class ManaCostComponent implements OnInit {

  constructor() { }

  @Input("src")
  src: string;
  ngOnInit() {
  }

}
