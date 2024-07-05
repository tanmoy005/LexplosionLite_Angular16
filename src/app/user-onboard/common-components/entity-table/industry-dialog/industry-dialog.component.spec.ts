import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryDialogComponent } from './industry-dialog.component';

describe('IndustryDialogComponent', () => {
  let component: IndustryDialogComponent;
  let fixture: ComponentFixture<IndustryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndustryDialogComponent]
    });
    fixture = TestBed.createComponent(IndustryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
