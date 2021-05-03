import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { exhaustMap } from "rxjs/operators";
import * as InstrumentActions from '../actions/instrumentation.actions';
import { InstrumentService } from "../instrument.service";


@Injectable({
    providedIn: 'root'
})

export class InstrumentationEffects {
    constructor(private actions$: Actions,
        private instrumentService: InstrumentService) { }

    startInstruments$ = createEffect(() => this.actions$.pipe(
        ofType(InstrumentActions.INSTRUMENT_START),
        exhaustMap(() => {
            this.instrumentService.startCollection();
            return of(InstrumentActions.INSTRUMENT_START_FINISHED());      
        })      
    ));

    stopInstruments$ = createEffect(() => this.actions$.pipe(
        ofType(InstrumentActions.INSTRUMENT_STOP),
        exhaustMap((action) => {
            this.instrumentService.stopCollection()
            return of(InstrumentActions.INSTRUMENT_STOP_FINISHED());
        })
    ));

}