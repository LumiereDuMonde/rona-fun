import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartingComponent } from './charting.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CoreModule } from '../core/core.module';
import { ChartPresentationComponent } from './chart-presentation/chart-presentation.component';
import { DOMWingman } from 'src/testing/dom-test-wingman';
import { ChartsModule } from 'ng2-charts';
import * as ChartingActions from './actions/charting.actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ChartingComponent', () => {
  let component: ChartingComponent;
  let wingman: DOMWingman<ChartingComponent>;
  let fixture: ComponentFixture<ChartingComponent>;
  let initialState;
  let store;
  beforeEach(() => {
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
    TestBed.configureTestingModule({
      schemas: [], 
      imports: [
        CoreModule,
        ChartsModule,
        BrowserAnimationsModule         
      ],
      declarations: [
        ChartingComponent,
        ChartPresentationComponent
      ],
      providers: [ 
        provideMockStore({ initialState })
      ]
    });
    fixture = TestBed.createComponent(ChartingComponent);
    component = fixture.componentInstance;
    wingman = new DOMWingman(fixture);
    store = TestBed.inject(MockStore);
    spyOn(store,'dispatch');
    
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('DOM', () => {
    it('has Death Chart', () => {
      expect(wingman.numberOfMatchingItems('#deathChart')).toBe(1);
    });

    it('has hospital Chart', () => {
      expect(wingman.numberOfMatchingItems('#hospitalChart')).toBe(1);
    });
    
    it('has test Chart', () => {
      expect(wingman.numberOfMatchingItems('#testChart')).toBe(1);
    });
    
    it('has infections Chart', () => {
      expect(wingman.numberOfMatchingItems('#infectionsChart')).toBe(1);
    });    

    it('has regions select', () => {
      expect(wingman.numberOfMatchingItems('#regionSelector')).toBe(1);
    });   

    it('has start date picker', () => {
      expect(wingman.numberOfMatchingItems('#startDate')).toBe(1);
    });   

    it('has end date picker', () => {
      expect(wingman.numberOfMatchingItems('#endDate')).toBe(1);
    });   
      
  });

  describe('Methods', () => {
    let date: string;
    beforeEach(() => {
      date = '01/01/2021';
    });
    
    it('nationStateValueChanged', () => {
      component.nationStateValueChanged('us');
      expect(store.dispatch).toHaveBeenCalledWith(ChartingActions.SET_CURRENT_SELECTION({ selection: 'us' }));
    });

    it('endDateChanged', () => {
      component.endDateChanged(date);

      expect(store.dispatch).toHaveBeenCalledWith(ChartingActions.SET_END_DATE({ ed: date }));
    });
    
    it('startDateChanged', () => {
      component.startDateChanged(date);

      expect(store.dispatch).toHaveBeenCalledWith(ChartingActions.SET_START_DATE({ sd: date }));
    });    

    it('ngOnInit', () => {      
      // Not really needed but added for coverage sake, the selectors are tested elsewhere
      fixture.detectChanges();
      expect(fixture).toBeTruthy();
    });
  });
  
  
});
