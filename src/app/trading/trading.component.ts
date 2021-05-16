import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TradeActions from './actions/trade.actions';
import * as fromTrading from './reducers';
import { TradeState } from './enums/tradeState.enum';

import * as BookActions from './actions/book.actions';
import { debounceTime } from 'rxjs/operators';



@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss']
})
export class TradingComponent implements OnInit, OnDestroy {
  connected$: Observable<TradeState>;      
  askBook$: Observable<number[][]>;
  bidBook$: Observable<number[][]>;  

  constructor(private store: Store) { }

  ngOnDestroy(): void {
    this.store.dispatch(TradeActions.TRADE_ENDING());  
    this.store.dispatch(BookActions.BOOK_ENDING());  
  }

  ngOnInit(): void {
    this.connected$ = this.store.select(fromTrading.selectConnectedStatus);    
    this.askBook$ = this.store.select(fromTrading.selectAskBook).pipe(debounceTime(100)); // 
    this.bidBook$ = this.store.select(fromTrading.selectBidBook).pipe(debounceTime(100));
    this.store.dispatch(TradeActions.TRADE_STARTING());
    this.store.dispatch(BookActions.BOOK_STARTING());
  }

}
