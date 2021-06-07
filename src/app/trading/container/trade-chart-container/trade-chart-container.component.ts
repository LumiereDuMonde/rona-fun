import * as TradeActions from '../../actions/trade.actions';
import * as fromTrading from '../../reducers';

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

import { ITrade } from '../../models/trade.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-trade-chart-container',
  templateUrl: './trade-chart-container.component.html',
  styleUrls: ['./trade-chart-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
