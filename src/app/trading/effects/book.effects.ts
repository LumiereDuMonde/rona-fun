import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as BookActions from '../actions/book.actions';
import { Injectable } from '@angular/core';
import { TradingService } from "../trading.service";
import { tap } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class BookEffects {
    constructor(private actions$: Actions, private service: TradingService) { }

    connectBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BookActions.BOOK_STARTING),
            tap(() => this.service.startBookFeed())
        )
    }, { dispatch: false });

    disconnectBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(BookActions.BOOK_ENDING),
            tap(() => this.service.stopBookFeed())
        )
    }, { dispatch: false });
}