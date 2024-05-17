import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingUnitComponent } from './operating-unit.component';

describe('OperatingUnitComponent', () => {
  let component: OperatingUnitComponent;
  let fixture: ComponentFixture<OperatingUnitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperatingUnitComponent]
    });
    fixture = TestBed.createComponent(OperatingUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
