import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStructureCardComponent } from './company-structure-card.component';

describe('CompanyStructureCardComponent', () => {
  let component: CompanyStructureCardComponent;
  let fixture: ComponentFixture<CompanyStructureCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyStructureCardComponent]
    });
    fixture = TestBed.createComponent(CompanyStructureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
