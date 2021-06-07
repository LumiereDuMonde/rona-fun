import * as BookActions from './actions/book.actions';
import * as TradeActions from './actions/trade.actions';
import * as TrafficActions from './actions/traffic.actions';

import { BehaviorSubject, EMPTY, Observable, Subscription, timer } from 'rxjs';
import {
  catchError,
  delayWhen,
  retryWhen,
  switchAll,
  tap
} from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { webSocket } from 'rxjs/webSocket';

export const WS_ENDPOINT = environment.BITCOIN_WEBSOCKET_URL;
export const RECONNECT_INTERVAL = environment.BITCOIN_RECONNECT_INTERVAL;

@Injectable({
  providedIn: 'root'
})
export class TradingService {
  private socket$;
  private messagesSubject$ = new BehaviorSubject(null);
  public messages$ = this.messagesSubject$.pipe(
    switchAll(),
    tap((msg) =>
      this.store.dispatch(TrafficActions.TRADE_TRAFFIC({ data: msg }))
    ),
    catchError((e) => {
      throw e;
    })
  );
  public data$;
  public subscription: Subscription = null;
  private bookStarted = false;
  private tradeStarted = false;

  constructor(private store: Store) {}

  /**
   * Creates a new WebSocket subject and send it to the messages subject
   * @param cfg if true the observable will be retried.
   */
  public connect(cfg: { reconnect: boolean } = { reconnect: false }): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      const messages = this.socket$.pipe(
        cfg.reconnect ? this.reconnect : (o) => o,
        tap({
          error: (error) => console.log(error)
        }),
        catchError((_) => EMPTY)
      );
      //toDO only next an observable if a new subscription was made double-check this
      this.messagesSubject$.next(messages);
    }
  }

  /**
   * Retry a given observable by a time span
   * @param observable the observable to be retried
   */
  private reconnect(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      retryWhen((errors) =>
        errors.pipe(
          tap((val) => console.log('[TradingService] Try to reconnect', val)),
          delayWhen((_) => timer(RECONNECT_INTERVAL))
        )
      )
    );
  }

  close() {
    this.socket$?.complete();
    this.socket$ = undefined;
    this.subscription?.unsubscribe();
    this.subscription = null;
  }

  sendMessage(msg: any) {
    this.socket$.next(msg);
  }

  /**
   * Return a custom WebSocket subject
   */
  private getNewWebSocket() {
    return webSocket({
      url: WS_ENDPOINT,
      openObserver: {
        next: () => {}
      },
      closeObserver: {
        next: () => {
          this.socket$?.complete();
          this.socket$ = undefined;
          this.tradeStarted = false;
          this.bookStarted = false;
          this.store.dispatch(TradeActions.TRADE_ENDED());
          this.store.dispatch(BookActions.BOOK_ENDED());
          //this.connect({ reconnect: true });
        }
      }
    });
  }

  startTradeFeed() {
    this.tradeStarted = true;
    this.connect();
    this.checkSubscription();
    this.sendMessage({
      event: 'subscribe',
      pair: ['XBT/USD'],
      subscription: { name: 'trade' }
    });
  }

  checkSubscription() {
    if (!this.subscription) {
      this.subscription = this.messages$.subscribe();
    }
  }

  stopTradeFeed() {
    this.sendMessage({
      event: 'unsubscribe',
      pair: ['XBT/USD'],
      subscription: { name: 'trade' }
    });
    this.tradeStarted = false;
    if (!(this.bookStarted || this.tradeStarted)) this.close();
  }

  startBookFeed() {
    this.bookStarted = true;
    this.connect();
    this.checkSubscription();
    this.sendMessage({
      event: 'subscribe',
      pair: ['XBT/USD'],
      subscription: { name: 'book' }
    });
  }

  stopBookFeed() {
    this.sendMessage({
      event: 'unsubscribe',
      pair: ['XBT/USD'],
      subscription: { name: 'book' }
    });
    this.bookStarted = false;
    if (!this.bookStarted && !this.tradeStarted) this.close();
  }
}
