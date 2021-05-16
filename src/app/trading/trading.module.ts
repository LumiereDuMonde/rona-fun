import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradingRoutingModule } from './trading-routing.module';
import { TradingComponent } from './trading.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TradeEffects } from './effects/trades.effects';
import { TrafficEffects } from './effects/traffic.effects';
import * as fromTrading from './reducers';
import { CoreModule } from '../core/core.module';
import { ChartsModule } from 'ng2-charts';
import { BookEffects } from './effects/book.effects';
import { OrderBookComponent } from './component/order-book/order-book.component';
import { TradeChartComponent } from './component/trade-chart/trade-chart.component';


@NgModule({
  declarations: [TradingComponent, OrderBookComponent, TradeChartComponent],
  imports: [
    CommonModule,
    TradingRoutingModule,
    StoreModule.forFeature(fromTrading.tradingFeatureKey, fromTrading.reducers),
    EffectsModule.forFeature([TrafficEffects, TradeEffects, BookEffects]),   
    CoreModule, 
    ChartsModule
  ]
})
export class TradingModule { }
