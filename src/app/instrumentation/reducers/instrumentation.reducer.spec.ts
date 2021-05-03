import * as fromReducer from './instrumentation.reducer';
import * as InstrumentActions from '../actions/instrumentation.actions';

describe('Instruments slice of the instrument feature key', () => {
    describe('Actions', () => {
        let newState: fromReducer.State;
        let initialState: fromReducer.State;

        beforeEach(() => {
            newState = {
                started: false,
                fuel: 0,
                speed: 0,
                wind: 0,
                temperature: 0,
                rpm: 0
            };
            initialState = { ...fromReducer.initialState };
        });

        it('unknown action', () => {
            const action = {
                type: 'Unknown',
            };
            const state = fromReducer.reducer(initialState, action);

            expect(state).toBe(initialState);
        });


        it('INSTRUMENT_START_FINISHED action', () => {
            newState.started = true;
            const action = InstrumentActions.INSTRUMENT_START_FINISHED
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });

        it('INSTRUMENT_STOP_FINISHED action', () => {
            initialState.started = true;
            newState.started = false;
            const action = InstrumentActions.INSTRUMENT_STOP_FINISHED
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });

        it('INSTRUMENT_RPM_UPDATE action', () => {
            newState.rpm = 2.0;
            const action = InstrumentActions.INSTRUMENT_RPM_UPDATE({ val: 2.0 });
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });

        it('INSTRUMENT_FUEL_UPDATE action', () => {
            newState.fuel = 2.0;
            const action = InstrumentActions.INSTRUMENT_FUEL_UPDATE({ val: 2.0 });
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });

        it('INSTRUMENT_SPEED_UPDATE action', () => {
            newState.speed = 2.0;
            const action = InstrumentActions.INSTRUMENT_SPEED_UPDATE({ val: 2.0 });
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });

        it('INSTRUMENT_TEMP_UPDATE action', () => {
            newState.temperature = 2.0;
            const action = InstrumentActions.INSTRUMENT_TEMP_UPDATE({ val: 2.0 });
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });

        it('INSTRUMENT_WIND_UPDATE action', () => {
            newState.wind = 2.0;
            const action = InstrumentActions.INSTRUMENT_WIND_UPDATE({ val: 2.0 });
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });

    });


    describe('Getters', () => {
        let state;
        beforeEach(() => {
            state = {
                started: true,
                fuel: 1,
                speed: 2,
                wind: 3,
                temperature: 4,
                rpm: 5
            };
        });

        it('getFuel', () => {
            expect(fromReducer.getFuel(state)).toEqual(1);
        });

        it('getRPM', () => {
            expect(fromReducer.getRPM(state)).toEqual(5);
        });

        it('getSpeed', () => {
            expect(fromReducer.getSpeed(state)).toEqual(2);
        });

        it('getStarted', () => {
            expect(fromReducer.getStarted(state)).toEqual(true);
        });

        it('getTemp', () => {
            expect(fromReducer.getTemp(state)).toEqual(4);
        });

        it('getWind', () => {
            expect(fromReducer.getWind(state)).toEqual(3);
        });
    });

});
