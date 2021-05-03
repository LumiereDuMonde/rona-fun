import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { Action } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { ChartingService } from '../charting.service';
import { ChartingEffects } from './charting.effects';
import * as ChartingActions from '../actions/charting.actions';

describe('ChartingEffects', () => {
  let effect: ChartingEffects;
  let actions$ = new Observable<Action>();
  let chartingService: any;
  let store: any;
  let initialState: any;

  beforeEach(() => {
    chartingService = jasmine.createSpyObj('ChartingService', ['getCovidTrackingData']);
    chartingService.getCovidTrackingData.and.returnValue(of([
      { "date": 20210307, "states": 56, "positive": 28756489, "negative": 74582825, "pending": 11808, "hospitalizedCurrently": 40199, "hospitalizedCumulative": 776361, "inIcuCurrently": 8134, "inIcuCumulative": 45475, "onVentilatorCurrently": 2802, "onVentilatorCumulative": 4281, "dateChecked": "2021-03-07T24:00:00Z", "death": 515151, "hospitalized": 776361, "totalTestResults": 363825123, "lastModified": "2021-03-07T24:00:00Z", "recovered": null, "total": 0, "posNeg": 0, "deathIncrease": 842, "hospitalizedIncrease": 726, "negativeIncrease": 131835, "positiveIncrease": 41835, "totalTestResultsIncrease": 1170059, "hash": "a80d0063822e251249fd9a44730c49cb23defd83" }, { "date": 20210306, "states": 56, "positive": 28714654, "negative": 74450990, "pending": 11783, "hospitalizedCurrently": 41401, "hospitalizedCumulative": 775635, "inIcuCurrently": 8409, "inIcuCumulative": 45453, "onVentilatorCurrently": 2811, "onVentilatorCumulative": 4280, "dateChecked": "2021-03-06T24:00:00Z", "death": 514309, "hospitalized": 775635, "totalTestResults": 362655064, "lastModified": "2021-03-06T24:00:00Z", "recovered": null, "total": 0, "posNeg": 0, "deathIncrease": 1680, "hospitalizedIncrease": 503, "negativeIncrease": 143835, "positiveIncrease": 60015, "totalTestResultsIncrease": 1430992, "hash": "dae5e558c24adb86686bbd58c08cce5f610b8bb0" }
    ]));
    store = jasmine.createSpyObj('Store', ['select']);
    store.select.and.returnValue(of('US'));
    initialState = {
      chart: {
        charting: {
          everLoaded: true,
          error: null,
          loading: false,
          covidData: [],
          selected: 'US',
          startDate: '01/01/2020',
          endDate: '03/08/2021',
          selectedType: 'Deaths'
        }
      }
    };
  });



  describe('Actions', () => {
    beforeEach(() => {

      TestBed.configureTestingModule({
        providers: [
          ChartingEffects,
          provideMockActions(() => actions$),
          { provide: Store, useValue: store },
          { provide: ChartingService, useValue: chartingService },

        ]
      });
      effect = TestBed.inject(ChartingEffects);
      spyOn(effect, 'getCovidData').and.callFake((data) => {
        return of(ChartingActions.GET_COVID_DATA_FAILURE({ errorMsg: 'error' }));
      });
    });

    it('SET_CURRENT_SELECTION calls getCovidData', () => {
      actions$ = of(ChartingActions.SET_CURRENT_SELECTION({ selection: 'CA' }));
      effect.changingCovidSelector$.subscribe();
      expect(effect.getCovidData).toHaveBeenCalledWith('CA');
    });

    it('GET_COVID_DATA_START calls getCovidData', () => {
      actions$ = of(ChartingActions.GET_COVID_DATA_START());
      effect.startGettingNationalData$.subscribe();
      expect(effect.getCovidData).toHaveBeenCalledWith('US');
    });
  });


  describe('getCovidData', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ChartingEffects,
          provideMockActions(() => actions$),
          { provide: Store, useValue: store },
          { provide: ChartingService, useValue: chartingService },

        ]
      });
      effect = TestBed.inject(ChartingEffects);
    });
    it('can load instance', () => {
      expect(effect).toBeTruthy();
    });

    it('getCovidData success', () => {
      effect.getCovidData('US').subscribe((result) => {
        expect(result.type).toEqual('[Charting] Get COVID Data Success');
      });
    });

    it('getCovidData success with empty array returned', () => {
      chartingService.getCovidTrackingData.and.returnValue(of([]));
      effect.getCovidData('US').subscribe((result) => {
        expect(result.type).toEqual('[Charting] Get COVID Data Success');
      });
    });

    it('getCovidData failure', () => {
      chartingService.getCovidTrackingData.and.returnValue(throwError('message'));
      effect.getCovidData('US').subscribe((result) => {
        expect(result.type).toEqual('[Charting] Get COVID Data Failure');
      });
    });
  });

});




