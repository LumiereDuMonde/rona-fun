import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';
import * as fromCharting from './reducers';
import * as ChartingActions from './actions/charting.actions';
import { Actions, ofType } from '@ngrx/effects';
import { of, race } from 'rxjs';
import { CovidData } from './models/CovidData.model';


@Injectable({ providedIn: 'root' })
export class ChartingDataResolver implements Resolve<Action> {
    constructor(private store: Store<fromCharting.State>, private actions$: Actions, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot) {
        let hasLoaded: boolean = false;
        let data: CovidData[];
        this.store.select(fromCharting.selectChartingEverLoaded).pipe(take(1)).subscribe(value => hasLoaded = value);
        if (hasLoaded) {
            this.store.select(fromCharting.selectCovidData).pipe(take(1)).subscribe(value => data = [...value]);
            return ChartingActions.GET_COVID_DATA_SUCCESS;
        } else {
            this.store.dispatch(ChartingActions.GET_COVID_DATA_START());
            const RESPONSE_OK = of(ChartingActions.GET_COVID_DATA_SUCCESS);
            const RESPONSE_ERROR = of(ChartingActions.GET_COVID_DATA_FAILURE).pipe(tap(() => this.router.navigate([''])));
            return race(RESPONSE_OK,RESPONSE_ERROR).pipe(take(1));            
        }        
    }
}