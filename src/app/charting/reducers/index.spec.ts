import * as moment from 'moment';
import { CovidChartTypes } from '../models/CovidChartTypes';
import { CovidData } from '../models/CovidData.model';
import * as fromReducer from './index'
describe('Charting Feature', () => {
    let covidData: CovidData[] = [];
    let allCovidData;
    beforeEach(() => {
        covidData = [new CovidData(
            20210102, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 'CA'
        ),
        new CovidData(
            20210103, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 'CA'
        ),
        new CovidData(
            20210104, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 'CA'
        ),
        ];
        allCovidData = {
            [CovidChartTypes.Deaths]: [{ data: [1], label: 'Total Deaths', type: 'line', yAxisID: 'left-axis', empty: false }, { data: [2], label: 'Daily Deaths', type: 'bar', yAxisID: 'right-axis', empty: false }],
            [CovidChartTypes.Hospitalized]: [{ data: [3], label: 'Total Hospitalized', type: 'line', yAxisID: 'left-axis', empty: false }, { data: [5], label: 'Daily Hospitalized', type: 'bar', yAxisID: 'right-axis', empty: false }],
            [CovidChartTypes.Infections]: [{ data: [0], label: 'Total Infections', type: 'line', yAxisID: 'left-axis', empty: true }, { data: [1], label: 'Daily Infections', type: 'bar', yAxisID: 'right-axis', empty: false }],
            [CovidChartTypes.Tests]: [{ data: [2], label: 'Total Tests', type: 'line', yAxisID: 'left-axis', empty: false }, { data: [3], label: 'Daily Tests', type: 'bar', yAxisID: 'right-axis', empty: false }]
        };
    });

    it('selectEndDateToDate should return correct date', () => {
        const dtStr = '01/01/2021';
        const dt = new Date(dtStr);
        expect(fromReducer.selectEndDateToDate.projector(dtStr)).toEqual(dt);
    });

    it('selectStartDateToDate should return correct date', () => {
        const dtStr = '01/01/2021';
        const dt = new Date(dtStr);
        expect(fromReducer.selectStartDateToDate.projector(dtStr)).toEqual(dt);
    });

    it('checkEmpty should be true', () => {
        expect(fromReducer.checkEmpty([null, null, null])).toBe(true);
        expect(fromReducer.checkEmpty([0, 0, 0])).toBe(true);
        expect(fromReducer.checkEmpty([null, 0, 0])).toBe(true);
    });

    it('checkEmpty should be false', () => {
        expect(fromReducer.checkEmpty([0, 0, 1])).toBe(false);
        expect(fromReducer.checkEmpty([1, null, 0])).toBe(false);
        expect(fromReducer.checkEmpty([2, 4, 1])).toBe(false);
    });

    it('returnComputedChartData should return correct row', () => {
        expect(fromReducer.returnComputedChartData([covidData[0]], CovidChartTypes.Deaths)).toEqual([{ data: [1], label: 'Total Deaths', type: 'line', yAxisID: 'left-axis', empty: false }, { data: [2], label: 'Daily Deaths', type: 'bar', yAxisID: 'right-axis', empty: false }]);
    });


    it('selectAllChartingData', () => {
        expect(fromReducer.selectAllChartingData.projector(covidData, new Date('01/02/2021'), new Date('01/02/2021'))).toEqual(allCovidData);
    });

    it('selectChartingDataForDeaths should return correct value', () => {
        expect(fromReducer.selectChartingDataForDeaths.projector(allCovidData)).toBe(allCovidData[CovidChartTypes.Deaths]);
    });
    
    it('selectChartingDataForInfected should return correct value', () => {
        expect(fromReducer.selectChartingDataForInfected.projector(allCovidData)).toBe(allCovidData[CovidChartTypes.Infections]);
    });

    it('selectChartingDataForHospitalized should return correct value', () => {
        expect(fromReducer.selectChartingDataForHospitalized.projector(allCovidData)).toBe(allCovidData[CovidChartTypes.Hospitalized]);
    });

    it('selectChartingDataForTests should return correct value', () => {
        expect(fromReducer.selectChartingDataForTests.projector(allCovidData)).toBe(allCovidData[CovidChartTypes.Tests]);
    });    

    it('selectChartingDataForSelected should return correct value', () => {
        expect(fromReducer.selectChartingDataForSelected.projector(allCovidData,CovidChartTypes.Tests)).toBe(allCovidData[CovidChartTypes.Tests]);
    });       

    it('selectChartingChartLabels should get labels', () => {
        expect(fromReducer.selectChartingChartLabels.projector(covidData,new Date('01/02/2021'), new Date('01/02/2021'))).toEqual([moment(new Date('01/02/2021'))]);
    });
    
    it('selectChartTitle should get title', () => {
        expect(fromReducer.selectChartTitle.projector('CA',CovidChartTypes.Deaths)).toBe('Deaths for California');
    });
    
});
