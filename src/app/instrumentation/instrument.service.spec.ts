import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { InstrumentService } from './instrument.service';
import * as fromInstruments from './reducers';

describe('InstrumentService', () => {
  let service: InstrumentService;
  let initialState: fromInstruments.InstrumentState;
  let store: MockStore;

  beforeEach(() => {
    initialState = {
      instruments: {
        started: false,
        fuel: 0,
        speed: 0,
        wind: 0,
        temperature: 0,
        rpm: 0
      }
    };

    TestBed.configureTestingModule({
      providers: [
        InstrumentService,
        provideMockStore({ initialState })
      ]
    });
    service = TestBed.inject(InstrumentService);
    store = TestBed.inject(MockStore);
    spyOn(store,'dispatch');
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('getCurrentValues should be zero', () => {
    const values = service.getCurrentValues();
    expect(values).toEqual({
      gas: 0,
      wind: 0,
      temp: 0,
      mph: 0,
      rpm: 0
    });
  });

  it('startCollection calls dispatch', () => {        
    service.startCollection();
    const values = service.getCurrentValues(); 
    expect(values).toEqual({
      gas: 4.2,
      wind: 5.5,
      temp: 76,
      mph: 67,
      rpm: 4500
    });    
  });
  
  it('Stopcollection resets data', () => {
    service.startCollection();
    let values = service.getCurrentValues(); 
    expect(values).toEqual({
      gas: 4.2,
      wind: 5.5,
      temp: 76,
      mph: 67,
      rpm: 4500
    });       
    service.stopCollection();
    values = service.getCurrentValues();
    expect(values).toEqual({
      gas: 0,
      wind: 0,
      temp: 0,
      mph: 0,
      rpm: 0
    });        
  });
  
  
});
