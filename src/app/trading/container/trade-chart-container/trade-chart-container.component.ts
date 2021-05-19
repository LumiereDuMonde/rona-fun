import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TradeActions from '../../actions/trade.actions';
import { ITrade } from '../../models/trade.model';
import * as fromTrading from '../../reducers';

@Component({
  selector: 'app-trade-chart-container',
  templateUrl: './trade-chart-container.component.html',
  styleUrls: ['./trade-chart-container.component.scss']
})
export class TradeChartContainerComponent implements OnInit, OnDestroy {
  lastTrade$: Observable<ITrade[]>;
  
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(TradeActions.TRADE_STARTING());
    this.lastTrade$ = this.store.select(fromTrading.selectLastTrade);
  }

  ngOnDestroy(): void {
    this.store.dispatch(TradeActions.TRADE_ENDING());  
  }
}
