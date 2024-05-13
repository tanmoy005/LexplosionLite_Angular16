import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialLayoutHeaderComponent } from './initial-layout-header.component';

describe('InitialLayoutHeaderComponent', () => {
  let component: InitialLayoutHeaderComponent;
  let fixture: ComponentFixture<InitialLayoutHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitialLayoutHeaderComponent]
    });
    fixture = TestBed.createComponent(InitialLayoutHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
