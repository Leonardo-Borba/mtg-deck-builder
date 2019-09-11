import { Component, OnInit, ElementRef } from '@angular/core';
import { Card } from '../models/Card';

@Component({
  selector: 'app-card-tooltip',
  templateUrl: './card-tooltip.component.html',
  styleUrls: ['./card-tooltip.component.less']
})
export class CardTooltipComponent implements OnInit {

  constructor(public card: Card, private element: ElementRef, private event: MouseEvent) { }

  ngOnInit() {
    const tooltip = this.element.nativeElement.childNodes[0];
    tooltip.style.top = `${this.event.clientY}px`;
    tooltip.style.left = `${this.event.clientX}px`;
  }

}
