import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DOMWingman } from 'src/testing/dom-test-wingman';
import { MockComponent } from 'ng-mocks';
import { TradingComponent } from './trading.component';
import { TradeChartContainerComponent } from './container/trade-chart-container/trade-chart-container.component';
import { OrderBookContainerComponent } from './container/order-book-container/order-book-container.component';

describe('TradingComponent', () => {
  let component: TradingComponent;
  let fixture: ComponentFixture<TradingComponent>;
  let wingman: DOMWingman<TradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        TradingComponent, 
        MockComponent(TradeChartContainerComponent),
        MockComponent(OrderBookContainerComponent) 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingComponent);
    component = fixture.componentInstance;
    wingman = new DOMWingman(fixture);
    fixture.detectChanges();
  });

  describe('Methods', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });    
  });

  describe('DOM', () => {
    it('has chart container', () => {
      expect(wingman.numberOfMatchingItems('app-trade-chart-container')).toBe(1);
    });

    it('has order book container', () => {
      expect(wingman.numberOfMatchingItems('app-order-book-container')).toBe(1);
    });    
  });
  
});
