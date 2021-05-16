import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as TradeActions from '../../actions/trade.actions';

@Component({
  selector: 'app-trade-chart-container',
  templateUrl: './trade-chart-container.component.html',
  styleUrls: ['./trade-chart-container.component.scss']
})
export class TradeChartContainerComponent implements OnInit, OnDestroy {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(TradeActions.TRADE_STARTING());
  }

  ngOnDestroy(): void {
    this.store.dispatch(TradeActions.TRADE_ENDING());  
  }
}
