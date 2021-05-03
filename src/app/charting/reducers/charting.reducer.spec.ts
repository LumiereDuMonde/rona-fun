import { CovidChartTypes } from '../models/CovidChartTypes';
import * as fromReducer from './charting.reducer';
import * as ChartingActions from '../actions/charting.actions';
import { CovidData } from '../models/CovidData.model';

describe('Charting slice of Chart feature', () => {
    describe('Actions', () => {

        let newState: fromReducer.State;
        let initialState: fromReducer.State;
        let covidData: CovidData[];
        beforeEach(() => {
            newState = {
                everLoaded: false,
                error: null,
                loading: false,
                covidData: [],    
                selected: 'US',
                startDate: '01/01/2020',
                endDate: '03/08/2021',
                selectedType:  CovidChartTypes.Deaths
            };    
            initialState  = {...fromReducer.initialState};            
            covidData = [new CovidData(
                20210102, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 'CA'
            ),
            new CovidData(
                20210103, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 'CA'
            )]        
        });
        
        it('unknown action', () => {
            
            const action = {
                type: 'Unknown',
            };
            const state = fromReducer.reducer(initialState, action);

            expect(state).toBe(initialState);
        });

        it('GET_COVID_DATA_START action', () => {            
            newState.loading = true;
            const action = ChartingActions.GET_COVID_DATA_START();
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });     
        
        it('GET_COVID_DATA_SUCCESS action', () => {            
            initialState.loading = true;
            newState.everLoaded = true;
            newState.covidData = covidData;
            const action = ChartingActions.GET_COVID_DATA_SUCCESS({
                data: covidData
            });
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });       
        
        it('GET_COVID_DATA_FAILURE action', () => {            
            initialState.loading = true;
            newState.error = 'error'
            const action = ChartingActions.GET_COVID_DATA_FAILURE({ errorMsg: 'error'});
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });            

        it('SET_CURRENT_SELECTION action', () => {                      
            newState.selected = 'CA';
            newState.loading = true;
            const action = ChartingActions.SET_CURRENT_SELECTION({selection: 'CA'});
            const state = fromReducer.reducer(initialState, action);

            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });     

        it('SET_DATE_RANGE action', () => {                    
            newState.startDate = '01/01/22';
            newState.endDate = '02/02/22';            
            const action = ChartingActions.SET_DATE_RANGE({sd: '01/01/22', ed: '02/02/22'});
            const state = fromReducer.reducer(initialState, action);
            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });       
        
        it('SET_END_DATE action', () => {                            
            newState.endDate = '02/02/22';            
            const action = ChartingActions.SET_END_DATE({ed:'02/02/22'});
            const state = fromReducer.reducer(initialState, action);
            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });  
        
        it('SET_START_DATE action', () => {                            
            newState.startDate = '01/01/22';            
            const action = ChartingActions.SET_START_DATE({sd:'01/01/22'});
            const state = fromReducer.reducer(initialState, action);
            expect(state).toEqual(newState);
            expect(state).not.toBe(newState);
        });         

    });

    describe('Getters', () => {
        let state;        
        beforeEach(() => {                      
            state = {
                everLoaded: false,
                error: 'error',
                loading: true,
                covidData: [],    
                selected: 'US',
                startDate: '01/01/2020',
                endDate: '03/08/2021',
                selectedType:  CovidChartTypes.Deaths
            }           
        });        
       
        it('getCovidData', () => {
            expect(fromReducer.getCovidData(state)).toEqual([]);
        });

        it('getEverLoaded', () => {
            expect(fromReducer.getEverLoaded(state)).toBe(false);
        });

        it('getError', () => {
            expect(fromReducer.getError(state)).toBe('error');
        });

        it('getLoading', () => {
            expect(fromReducer.getLoading(state)).toBe(true);
        });

        it('getSelected', () => {
            expect(fromReducer.getSelected(state)).toBe('US');
        });

        it('getStartDate', () => {
            expect(fromReducer.getStartDate(state)).toBe('01/01/2020');
        });

        it('getEndDate', () => {
            expect(fromReducer.getEndDate(state)).toBe('03/08/2021');
        });

        it('getSelectedType', () => {
            expect(fromReducer.getSelectedType(state)).toBe(CovidChartTypes.Deaths);
        });                                                
        
    });
    
    
});
