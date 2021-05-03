import { CovidChartTypes } from "./CovidChartTypes";
import { CovidData } from "./CovidData.model";

describe('CovidData', () => {
    const data = new CovidData(
        20210102, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 'CA'
    );

    it('Constructor', () => {
        expect(JSON.parse(JSON.stringify(data))).toEqual({
            date: '2021-01-02T08:00:00.000Z',
            name: 'California',
            death: 1,
            deathIncrease: 2,
            hospitalizedCumulative: 3,
            hospitalizedCurrently: 4,
            hospitalizedIncrease: 5,
            inIcuCumulative: 6,
            inIcuCurrently: 7,
            onVentilatorCumulative: 8,
            onVentilatorCurrently: 9,
            positive: 0,
            positiveIncrease: 1,
            totalTestResults: 2,
            totalTestResultsIncrease: 3,
            recovered: 4,
        });
    });

    it('getData', () => {
        expect(data.getData(CovidChartTypes.Infections)).toBe(0);
        expect(data.getData(CovidChartTypes.Infections, true)).toBe(1);
        expect(data.getData(CovidChartTypes.Deaths)).toBe(1);
        expect(data.getData(CovidChartTypes.Deaths, true)).toBe(2);
        expect(data.getData(CovidChartTypes.Hospitalized)).toBe(3);
        expect(data.getData(CovidChartTypes.Hospitalized, true)).toBe(5);
        expect(data.getData(CovidChartTypes.Tests)).toBe(2);
        expect(data.getData(CovidChartTypes.Tests, true)).toBe(3);
    });

    it('getLabel', () => {
        expect(CovidData.getLabel('Test', true)).toBe(`Daily Test`);
        expect(CovidData.getLabel('Test')).toBe(`Total Test`);
    });

});
