import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { ChartingDataResolver } from './charting.resolver';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { isObservable } from "rxjs";


describe('ChartingDataResolver', () => {
  let service: ChartingDataResolver;
  let store: MockStore;
  let route: ActivatedRoute;
  let router: Router;
  let initialState;
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
      imports: [
        RouterTestingModule
      ],
      providers: [
        ChartingDataResolver,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' }) } },
        },        
        provideMockStore({ initialState }),
      ]
    });
    service = TestBed.inject(ChartingDataResolver);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });


  // TODO: figure out proper tests for ngrx resolvers
  it('Resolve with values',fakeAsync( () => {
    let a = service.resolve(route.snapshot);
    tick(1000);    
    if(isObservable(a)) {      
      a.subscribe(result => {
        expect(result.type).toEqual('[Charting] Get COVID Data Success');     
      });            
    } else {      
      expect(a.type).toEqual('[Charting] Get COVID Data Success');       
    }
    
  }));

  it('Resolve no values',fakeAsync( () => {
    initialState.chart.charting.everLoaded = false;
    store.setState(initialState);
    store.refreshState();
    let a = service.resolve(route.snapshot);
    if(isObservable(a)) {      
      a.subscribe(result => {
        expect(result.type).toEqual('[Charting] Get COVID Data Success');     
      });            
    } else {      
      expect(a.type).toEqual('[Charting] Get COVID Data Success');       
    }
    
  }))  ;
  
 
});
