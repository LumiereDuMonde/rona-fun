import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { InstrumentService } from "../instrument.service";
import { InstrumentationEffects } from "./instrumentation.effects";
import * as InstrumentActions from '../actions/instrumentation.actions';

describe('InstrumentationEffects', () => {
    let actions$ = new Observable<Action>();
    let effect: InstrumentationEffects;
    let instrumentService;
    beforeEach(() => {
        instrumentService = jasmine.createSpyObj('InstrumentService', ['startCollection', 'stopCollection']);
        TestBed.configureTestingModule({
            providers: [
                InstrumentationEffects,
                provideMockActions(() => actions$),
                { provide: InstrumentService, useValue: instrumentService }
            ]
        });
        effect = TestBed.inject(InstrumentationEffects);
    });

    it('can load instance', () => {
        expect(effect).toBeTruthy();
    });

    it('INSTRUMENT_START', () => {
        actions$ = of(InstrumentActions.INSTRUMENT_START());        
        effect.startInstruments$.subscribe((result) => {
            expect(result.type).toEqual('[INSTRUMENTATION] Start Finished');
            expect(instrumentService.startCollection).toHaveBeenCalled();
        });        
    });

    it('INSTRUMENT_STOP', () => {
        actions$ = of(InstrumentActions.INSTRUMENT_STOP());        
        effect.stopInstruments$.subscribe((result) => {
            expect(result.type).toEqual('[INSTRUMENTATION] Stop Finished');
            expect(instrumentService.stopCollection).toHaveBeenCalled();
        });        
    });    
});
