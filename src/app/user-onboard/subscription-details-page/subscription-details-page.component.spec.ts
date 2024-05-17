import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionDetailsPageComponent } from './subscription-details-page.component';

describe('SubscriptionDetailsPageComponent', () => {
  let component: SubscriptionDetailsPageComponent;
  let fixture: ComponentFixture<SubscriptionDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionDetailsPageComponent]
    });
    fixture = TestBed.createComponent(SubscriptionDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
