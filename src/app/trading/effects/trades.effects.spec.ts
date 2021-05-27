import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { TradingService } from '../trading.service';
import { TradeEffects } from './trades.effects';
import * as TradeActions from '../actions/trade.actions';

describe('TradeEffects', () => {
  let effect: TradeEffects;
  let actions$ = new Observable<Action>();
  let tradingServiceStub;

  beforeEach(() => {
    
    tradingServiceStub = jasmine.createSpyObj('TradingService',['startTradeFeed','stopTradeFeed']); 
    TestBed.configureTestingModule({
      providers: [
        TradeEffects,
        provideMockActions(() => actions$),
        { provide: TradingService, useValue: tradingServiceStub }
      ]
    });
    effect = TestBed.inject(TradeEffects);
  });

  it('can load instance', () => {
    expect(effect).toBeTruthy();
  });

  describe('Actions', () => {
    it('TRADE_STARTING', () => {
      actions$ = of(TradeActions.TRADE_STARTING);
      effect.connectTrade$.subscribe(() => {
        expect(tradingServiceStub.startTradeFeed).toHaveBeenCalled();
      });      
    });

    it('TRADE_ENDING', () => {
      actions$ = of(TradeActions.TRADE_ENDING);
      effect.disconnectTrade$.subscribe(() => {
        expect(tradingServiceStub.stopTradeFeed).toHaveBeenCalled();
      });      
    });

  });  
});
