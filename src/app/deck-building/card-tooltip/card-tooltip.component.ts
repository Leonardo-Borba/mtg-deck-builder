import { Component, OnInit, ElementRef } from '@angular/core';
import { Card } from '../models/Card';

@Component({
  selector: 'app-card-tooltip',
  templateUrl: './card-tooltip.component.html',
  styleUrls: ['./card-tooltip.component.less']
})
export class CardTooltipComponent implements OnInit {

  constructor(public card: Card, private element: ElementRef) { }

  ngOnInit() {

  }

  onShow(event: MouseEvent): void{
    const tooltip = this.element.nativeElement.childNodes[0];
    tooltip.style.top = `${event.clientY+10}px`;
    tooltip.style.left = `${event.clientX+10}px`;
  }

}
