import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { BehaviorSubject } from 'rxjs';
import { CoreModule } from 'src/app/core/core.module';
import { DOMWingman } from 'src/testing/dom-test-wingman';
import { ITrade } from '../../models/trade.model';

import { TradeChartComponent } from './trade-chart.component';

describe('TradeChartComponent', () => {
  let component: TradeChartComponent;
  let fixture: ComponentFixture<TradeChartComponent>;
  let wingman: DOMWingman<TradeChartComponent>;
  let trades: BehaviorSubject<ITrade[]>;
  

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [
        CoreModule,
        ChartsModule,
        BrowserAnimationsModule
      ],
      declarations: [TradeChartComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeChartComponent);
    component = fixture.componentInstance;
    wingman = new DOMWingman(fixture);
    trades = new BehaviorSubject(null);
    component.trades = trades;

    fixture.detectChanges();
  });

  describe('Methods', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('trades should be empty', () => {      
      expect(component.lastTrade.length === 0).toBeTruthy();
    });

    describe('ngAfterViewInit', () => {
      it('Subscription set', () => {
        expect(component.subscription).toBeTruthy();        
      });

      it('sets trades once Observable emits them', () => {       
       
        let tradeVal:ITrade = {
          misc: '',
          orderType: 'l',
          price: 14,
          side: 'b',
          time: Date.now(),
          volume: 2
        };

        trades.next([
          tradeVal 
        ]);

        expect(component.lastTrade).toEqual([tradeVal]);
        expect(component.datasets[0].data.length).toBe(1);
        expect(component.datasets[1].data.length).toBe(1);        
      });
    });

  });

  describe('DOM', () => {
    it('has chart', () => {
      expect(wingman.numberOfMatchingItems('#tradeChart')).toBe(1);
    });
  });

});
