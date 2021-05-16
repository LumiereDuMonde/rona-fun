import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as TradeActions from '../actions/trade.actions';
import { Injectable } from '@angular/core';
import { TradingService } from "../trading.service";
import { tap } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class TradeEffects {
    constructor(private actions$: Actions, private service: TradingService) { }

    connectTrade$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TradeActions.TRADE_STARTING),
            tap(() => this.service.startTradeFeed())
        )
    }, { dispatch: false });

    disconnectTrade$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TradeActions.TRADE_ENDING),
            tap(() => this.service.stopTradeFeed())
        )
    }, { dispatch: false });
}