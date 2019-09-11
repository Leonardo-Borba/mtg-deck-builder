import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTooltipComponent } from './card-tooltip.component';

describe('CardTooltipComponent', () => {
  let component: CardTooltipComponent;
  let fixture: ComponentFixture<CardTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
