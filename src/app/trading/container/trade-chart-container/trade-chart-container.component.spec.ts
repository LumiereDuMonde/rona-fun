import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';
import { of } from 'rxjs';
import { DOMWingman } from 'src/testing/dom-test-wingman';
import { TradeChartComponent } from '../../component/trade-chart/trade-chart.component';
import { TradeChartContainerComponent } from './trade-chart-container.component';
import * as TradeActions from '../../actions/trade.actions';
import * as fromTrading from '../../reducers';

describe('TradeChartContainerComponent', () => {
  let component: TradeChartContainerComponent;
  let fixture: ComponentFixture<TradeChartContainerComponent>;
  let wingman: DOMWingman<TradeChartContainerComponent>;
  let store: any;

  beforeEach(async () => {
    store = jasmine.createSpyObj('store',['dispatch','select']);
    store.select.and.returnValue(of({}));    
    await TestBed.configureTestingModule({
      declarations: [ TradeChartContainerComponent,  MockComponent(TradeChartComponent) ],
      providers: [
        { provide: Store, useValue: store }
      ]      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeChartContainerComponent);
    component = fixture.componentInstance;
    wingman = new DOMWingman(fixture);
    fixture.detectChanges();
  });

  describe('Methods', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });    

    it('ngOninit', () => {      
      expect(store.select).toHaveBeenCalledWith(fromTrading.selectLastTrade);
      expect(store.dispatch).toHaveBeenCalledWith(TradeActions.TRADE_STARTING());
    });
    
    it('ngOnDestroy', () => {
      component.ngOnDestroy();
      expect(store.dispatch).toHaveBeenCalledWith(TradeActions.TRADE_ENDING());
    });    
  });

  describe('DOM', () => {
    it('Should have app-trade-chart', () => {
      expect(wingman.numberOfMatchingItems('app-trade-chart')).toBe(1);
    });
  });
  
});
