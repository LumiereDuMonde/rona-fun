import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import * as ChartingActions from '../actions/charting.actions';
import { ChartingService } from "../charting.service";
import { CovidData } from "../models/CovidData.model";
import * as fromCharting from '../reducers';


@Injectable({
    providedIn: 'root'
})

export class ChartingEffects {
    constructor(private actions$: Actions,
        private chartingService: ChartingService,        
        private store: Store) { }

    startGettingNationalData$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ChartingActions.GET_COVID_DATA_START),
            concatLatestFrom(() => this.store.select(fromCharting.selectSelected)),
            exhaustMap(([, data]) => this.getCovidData(data))
        );
    });

    changingCovidSelector$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ChartingActions.SET_CURRENT_SELECTION),
            exhaustMap((action) => this.getCovidData(action.selection))
        )
    });

    public getCovidData = function (data): Observable<Action> {        
        return this.chartingService.getCovidTrackingData(data).pipe(
            map((result: any[]) => {
             return result?.map((item) => CovidData.adapt(item));
            }),
            map(
                (response: CovidData[]) => {
                    response?.sort(function (a, b) {
                        return a.date.getTime() - b.date.getTime()
                    })
                    return ChartingActions.GET_COVID_DATA_SUCCESS({ data: response })
                }
            ),
            catchError(
                (error) =>
                    of(ChartingActions.GET_COVID_DATA_FAILURE({ errorMsg: error.message }))
            )
        )
    }
}

