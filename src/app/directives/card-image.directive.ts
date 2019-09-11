import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Card } from '../deck-building/models/Card';

@Directive({
  selector: '[cardImage]'
})
export class CardImageDirective implements OnInit {
   
  ngOnInit(): void {
    this.renderer.setStyle(this.element.nativeElement, "background-image", `url(${this.card.croppedImage})`)
  }

  @Input("cardImage")
  card: Card

  constructor(private element: ElementRef, private renderer: Renderer2) {
   }


}
