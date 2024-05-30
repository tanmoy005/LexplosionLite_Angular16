import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoLivePageComponent } from './go-live-page.component';

describe('GoLivePageComponent', () => {
  let component: GoLivePageComponent;
  let fixture: ComponentFixture<GoLivePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoLivePageComponent]
    });
    fixture = TestBed.createComponent(GoLivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
