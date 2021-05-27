import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreModule } from 'src/app/core/core.module';
import { DOMWingman } from 'src/testing/dom-test-wingman';

import { OrderBookComponent } from './order-book.component';

describe('OrderBookComponent', () => {
  let component: OrderBookComponent;
  let fixture: ComponentFixture<OrderBookComponent>;
  let wingman: DOMWingman<OrderBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderBookComponent ],
      imports: [
        CoreModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBookComponent);
    component = fixture.componentInstance;
    wingman = new DOMWingman(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('DOM', () => {
    it('have order book display item', () => {
      expect(wingman.numberOfMatchingItems('[mat-table]')).toBe(1);
    });
  });
  
  
});
