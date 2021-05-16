import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as TradeActions from '../actions/trade.actions';
import * as BookActions from '../actions/book.actions';
import * as TrafficActions from '../actions/traffic.actions';
import { MessageType, TrafficType } from '../enums/traffic.enum';
import { GenericEvent } from '../models/genericEvent.model';
import { ITrade } from '../models/trade.model';
import { BookLevel } from '../models/book.model';

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
    constructor(private actions$: Actions) { }

    trafficCopEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TrafficActions.TRADE_TRAFFIC),
            map((traffic) => {
                if (Array.isArray(traffic.data)) {
                    // payload
                    const len = traffic.data.length;

                    switch (traffic.data[len - 2]) {
                        case TrafficType.Trade:
                            const trades: ITrade[] = traffic.data[1].map(x => ({
                                price: x[0],
                                volume: x[1],
                                time: x[2],
                                side: x[3],
                                orderType: x[4],
                                misc: x[5]
                            } as ITrade));
                            return TradeActions.TRADE_PAYLOAD({
                                trades: trades
                            });
                        case TrafficType.Book:
                            const book: BookLevel = traffic.data[1] as BookLevel;
                            if (book?.as && book?.bs) {
                                //snapshot
                                return BookActions.BOOK_PAYLOAD_SNAPSHOT({ book });
                            }
                            if (book?.a || book?.b) {
                                //update
                                return BookActions.BOOK_PAYLOAD_UPDATE({ book });
                            }
                            break;
                    }
                } else {
                    // event
                    const event = traffic.data as GenericEvent;
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
                }
                return TrafficActions.TRADE_TRAFFIC_UNHANDLED({ data: traffic.data });
            })
        );
    });

}