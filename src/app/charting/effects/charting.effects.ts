import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import * as ChartingActions from '../actions/charting.actions';
import { ChartingService } from "../charting.service";
import { ChartingAdapter } from "../models/NationalCovidDay";


@Injectable({
    providedIn: 'root'
})

export class ChartingEffects {
    constructor(private actions$: Actions, private chartingService: ChartingService, private adapter: ChartingAdapter) { }

startGettingNationalData$ = createEffect(() => {
    return this.actions$.pipe(
            ofType(ChartingActions.GET_COVID_DATA_START),
            /** An EMPTY observable only emits completion. Replace with your own observable stream */
            exhaustMap(() => 
                this.chartingService.getNationalCovidData().pipe(
                    map((data: any[]) => data.map((item) => this.adapter.adapt(item))),
                    map(
                        response => {
                            response.sort(function (a, b) { 
                                return a.date.getTime() - b.date.getTime()
                            })
                            return ChartingActions.GET_COVID_DATA_SUCCESS({data: response})
                        }
                    ),
                    catchError(
                        (error) => 
                        of(ChartingActions.GET_COVID_DATA_FAILURE({errorMsg: error.message}))
                    )
                )
            )
            );
});

}