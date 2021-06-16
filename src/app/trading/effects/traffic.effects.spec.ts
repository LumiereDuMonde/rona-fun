import * as BookActions from '../actions/book.actions';
import * as TradeActions from '../actions/trade.actions';
import * as TrafficActions from '../actions/traffic.actions';

import { MessageType, TrafficType } from '../enums/traffic.enum';
import { Observable, of } from 'rxjs';

import { Action } from '@ngrx/store';
import { GenericEvent } from '../models/genericEvent.model';
import { TestBed } from '@angular/core/testing';
import { TrafficEffects } from './traffic.effects';
import { provideMockActions } from '@ngrx/effects/testing';

describe('TrafficEffects', () => {
  let effect: TrafficEffects;
  let actions$ = new Observable<Action>();

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        TrafficEffects,
        provideMockActions(() => actions$),
      ]
    });
    effect = TestBed.inject(TrafficEffects);
  });

  it('can load instance', () => {
    expect(effect).toBeTruthy();
  });

  describe('ACTIONS', () => {

    it('Unhandled null traffic', () => {
      actions$ = of(TrafficActions.TRADE_TRAFFIC({ data: null }));
      effect.trafficCopEffect$.subscribe((result) => {
        expect(result).toEqual(TrafficActions.TRADE_TRAFFIC_UNHANDLED({ data: null }));
      });
    });

    describe('Events', () => {

      it('Trade started event traffic', () => {
        const eventTraffic: GenericEvent = {
          event: MessageType.SubscriptionStatus,
          status: MessageType.Subscribe,
          subscription: {
            name: TrafficType.Trade
          }
        };
        actions$ = of(TrafficActions.TRADE_TRAFFIC({ data: eventTraffic }));
        effect.trafficCopEffect$.subscribe((result) => {
          expect(result).toEqual(TradeActions.TRADE_STARTED());
        });
      });

      it('Book started event traffic', () => {
        const eventTraffic: GenericEvent = {
          event: MessageType.SubscriptionStatus,
          status: MessageType.Subscribe,
          subscription: {
            name: TrafficType.Book
          }
        };
        actions$ = of(TrafficActions.TRADE_TRAFFIC({ data: eventTraffic }));
        effect.trafficCopEffect$.subscribe((result) => {
          expect(result).toEqual(BookActions.BOOK_STARTED());
        });
      });

      it('Book ended event traffic', () => { 
        const eventTraffic: GenericEvent = {
          event: MessageType.SubscriptionStatus,
          status: MessageType.Unsubscribe,
          subscription: {
            name: TrafficType.Book
          }
        };
        actions$ = of(TrafficActions.TRADE_TRAFFIC({ data: eventTraffic }));
        effect.trafficCopEffect$.subscribe((result) => {
          expect(result).toEqual(BookActions.BOOK_ENDED());
        });
      });

      it('Trade ended event traffic', () => {
        const eventTraffic: GenericEvent = {
          event: MessageType.SubscriptionStatus,
          status: MessageType.Unsubscribe,
          subscription: {
            name: TrafficType.Trade
          }
        };
        actions$ = of(TrafficActions.TRADE_TRAFFIC({ data: eventTraffic }));
        effect.trafficCopEffect$.subscribe((result) => {
          expect(result).toEqual(TradeActions.TRADE_ENDED());
        });
      });

    });
  });

  describe('Payload', () => {
    it('TRADE_PAYLOAD', () => {
      const payload = [
        0,
        [
          [
            "5541.20000",
            "0.15850568",
            "1534614057.321597",
            "s",
            "l",
            ""
          ]
        ],
        "trade",
        "XBT/USD"
      ];
      const resultPayload: any = [
        {
          misc: "",
          orderType: "l",
          price: "5541.20000",
          side: "s",
          time: "1534614057.321597",
          volume: "0.15850568"
        }
      ]
      actions$ = of(TrafficActions.TRADE_TRAFFIC({ data: payload })); 
      effect.trafficCopEffect$.subscribe((result) => {
        expect(result).toEqual(TradeActions.TRADE_PAYLOAD({trades: resultPayload}));
      });     
      
    });

    it('BOOK_PAYLOAD_SNAPSHOT', () => {
      const payload = [
        0,
        {
          "as": [
            [
              "5541.30000",
              "2.50700000",
              "1534614248.123678"
            ]
          ],
          "bs": [
            [
              "5541.20000",
              "1.52900000",
              "1534614248.765567"
            ]
          ]
        },
        "book-10",
        "XBT/USD"
      ];
      const resultPayload: any = {
        "as": [
          [
            "5541.30000",
            "2.50700000",
            "1534614248.123678"
          ]
        ],
        "bs": [
          [
            "5541.20000",
            "1.52900000",
            "1534614248.765567"
          ]
        ]
      };
      actions$ = of(TrafficActions.TRADE_TRAFFIC({ data: payload })); 
      effect.trafficCopEffect$.subscribe((result) => {
        expect(result).toEqual(BookActions.BOOK_PAYLOAD_SNAPSHOT({book: resultPayload}));
      });         
    });

    it('BOOK_PAYLOAD_UPDATE', () => {
      const payload = [
        1234,
        {
          "a": [
            [
              "5541.30000",
              "2.50700000",
              "1534614248.456738"
            ],
            [
              "5542.50000",
              "0.40100000",
              "1534614248.456738"
            ]
          ],
          "c": "974942666"
        },
        "book-10",
        "XBT/USD"
      ]
      const resultPayload: any = {
        "a": [
          [
            "5541.30000",
            "2.50700000",
            "1534614248.456738"
          ],
          [
            "5542.50000",
            "0.40100000",
            "1534614248.456738"
          ]
        ],
        "c": "974942666"
      };
      actions$ = of(TrafficActions.TRADE_TRAFFIC({ data: payload })); 
      effect.trafficCopEffect$.subscribe((result) => {
        expect(result).toEqual(BookActions.BOOK_PAYLOAD_UPDATE({book: resultPayload}));
      });         
    });    
    
  });
  
});
