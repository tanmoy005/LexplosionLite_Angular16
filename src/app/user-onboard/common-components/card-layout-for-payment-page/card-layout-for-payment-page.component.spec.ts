import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLayoutForPaymentPageComponent } from './card-layout-for-payment-page.component';

describe('CardLayoutForPaymentPageComponent', () => {
  let component: CardLayoutForPaymentPageComponent;
  let fixture: ComponentFixture<CardLayoutForPaymentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardLayoutForPaymentPageComponent]
    });
    fixture = TestBed.createComponent(CardLayoutForPaymentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
