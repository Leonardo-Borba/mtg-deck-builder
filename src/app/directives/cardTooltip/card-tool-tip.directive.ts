import { Directive, ElementRef, HostListener, ApplicationRef, ComponentFactoryResolver, Injector, Input, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { Card } from 'src/app/deck-building/models/Card';
import { CardTooltipComponent } from 'src/app/deck-building/card-tooltip/card-tooltip.component';
import { CardTooltipInjector } from './card-tooltip-injector';

@Directive({
  selector: '[cardToolTip]'
})
export class CardToolTipDirective {

  constructor(private element: ElementRef, 
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) {}

  @Input("card")
  card: Card;

  dialogComponentRef: ComponentRef<CardTooltipComponent>

  @HostListener('mouseover', ['$event'])
  mouseover(e: MouseEvent){
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CardTooltipComponent);
    let map = new WeakMap<any,any>()
    map.set(Card, this.card)
    map.set(MouseEvent, e)
    const componentRef = componentFactory.create(new CardTooltipInjector(this.injector, map));
    
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    
    this.dialogComponentRef = componentRef;
    this.dialogComponentRef.instance.onShow(e)
  }

  @HostListener('mouseout', ['$event'])
  mouseout(e: MouseEvent){
    this.appRef.detachView(this.dialogComponentRef.hostView);
    this.dialogComponentRef.destroy();
  }
}
