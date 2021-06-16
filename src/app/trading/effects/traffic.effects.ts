import * as BookActions from '../actions/book.actions';
import * as TradeActions from '../actions/trade.actions';
import * as TrafficActions from '../actions/traffic.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MessageType, TrafficType } from '../enums/traffic.enum';

import { BookLevel } from '../models/book.model';
import { GenericEvent } from '../models/genericEvent.model';
import { ITrade } from '../models/trade.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

/*
 *
 *   Parsing and directing websocket data based on the following documentation
 *   https://docs.kraken.com/websockets/
 *
 */

@Injectable({
  providedIn: 'root'
})
export class TrafficEffects {
  constructor(private actions$: Actions) {}

  trafficCopEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TrafficActions.TRADE_TRAFFIC),
      map((traffic) => {
        if (this.checkIfPayloadOrEvent(traffic.data)) {
          // payload
          const len = traffic.data.length;
          if (len > 2) {
            switch (traffic.data[len - 2]) {
              case TrafficType.Trade:
                return this.setTradeAction(traffic.data[1]);
              case TrafficType.Book:
                return this.setBookAction(traffic.data);
            }
          }
        } else {
          // event
          return this.processEventAction(traffic.data);
        }
        return TrafficActions.TRADE_TRAFFIC_UNHANDLED({ data: traffic.data });
      })
    );
  });

  private checkIfPayloadOrEvent(data: any) {
    return Array.isArray(data);
  }

  private setTradeAction(data: any) {
    const trades: ITrade[] = data.map(
      (x) =>
        ({
          price: x[0],
          volume: x[1],
          time: x[2],
          side: x[3],
          orderType: x[4],
          misc: x[5]
        } as ITrade)
    );
    return TradeActions.TRADE_PAYLOAD({
      trades
    });
  }

  private setBookAction(data: any) {
    const book = data[1] as BookLevel;
    if (book?.as && book?.bs) {
      //snapshot
      return BookActions.BOOK_PAYLOAD_SNAPSHOT({ book });
    }
    if (book?.a || book?.b) {
      //update
      return BookActions.BOOK_PAYLOAD_UPDATE({ book });
    }
    return TrafficActions.TRADE_TRAFFIC_UNHANDLED({ data });
  }

  private processEventAction(event: GenericEvent) {
    if (event?.event) {
      switch (event.event) {
        case MessageType.SubscriptionStatus:
          if (event?.status == MessageType.Subscribe) {
            if (event?.subscription?.name == TrafficType.Trade) {
              return TradeActions.TRADE_STARTED();
            }

            if (event?.subscription?.name == TrafficType.Book) {
              return BookActions.BOOK_STARTED();
            }
          } else if (event?.status == MessageType.Unsubscribe) {
            if (event?.subscription?.name == TrafficType.Trade) {
              return TradeActions.TRADE_ENDED();
            }
            if (event?.subscription?.name == TrafficType.Book) {
              return BookActions.BOOK_ENDED();
            }
          }
          break;
      }
    }
    return TrafficActions.TRADE_TRAFFIC_UNHANDLED({ data: event });
  }
}
