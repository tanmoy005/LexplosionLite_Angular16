import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionCardComponent } from './terms-condition-card.component';

describe('TermsConditionCardComponent', () => {
  let component: TermsConditionCardComponent;
  let fixture: ComponentFixture<TermsConditionCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermsConditionCardComponent]
    });
    fixture = TestBed.createComponent(TermsConditionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
