import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { DOMWingman } from 'src/testing/dom-test-wingman';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;
  let wingman: DOMWingman<LoadingSpinnerComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoadingSpinnerComponent]
    });
    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    wingman = new DOMWingman(fixture);
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('DOM', () => {
    it('has spinner', () => {
      expect(wingman.numberOfMatchingItems('.lds-dual-ring')).toBe(1);
    });
  });
  
 
  
});
