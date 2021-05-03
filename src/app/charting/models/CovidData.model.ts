import { state_hash } from '../../core/states';
import { CovidChartTypes } from './CovidChartTypes';

interface CovidDataInterface {
    date: Date;
    death: number;
    deathIncrease: number;
    hospitalizedCumulative: number;
    hospitalizedCurrently: number;
    hospitalizedIncrease: number;
    inIcuCumulative: number;
    inIcuCurrently: number;
    onVentilatorCumulative: number;
    onVentilatorCurrently: number;
    positive: number;
    positiveIncrease: number;
    totalTestResults: number;
    totalTestResultsIncrease: number;
    recovered: number;
    name: string;
}

export class CovidData implements CovidDataInterface {
    date: Date;
    name: string;
    constructor(
        _date: number,
        public death: number,
        public deathIncrease: number,
        public hospitalizedCumulative: number,
        public hospitalizedCurrently: number,
        public hospitalizedIncrease: number,
        public inIcuCumulative: number,
        public inIcuCurrently: number,
        public onVentilatorCumulative: number,
        public onVentilatorCurrently: number,
        public positive: number,
        public positiveIncrease: number,
        public totalTestResults: number,
        public totalTestResultsIncrease: number,
        public recovered: number,
        _name: string
    ) {
        try {
            this.date = new Date(_date / 10000, _date % 10000 / 100 - 1, _date % 100);

        } catch (error) {
            this.date = null;            
        }

        this.name = state_hash[_name];
    }

    getData(dataType: string, daily: boolean = false) : number {
        switch (dataType) {
            case CovidChartTypes.Infections:
                return daily ?  this.positiveIncrease : this.positive;                
            case CovidChartTypes.Deaths:
                return daily ?  this.deathIncrease : this.death;                
            case CovidChartTypes.Hospitalized:
                return daily ?  this.hospitalizedIncrease : this.hospitalizedCumulative;                
            case CovidChartTypes.Tests:
                return daily ?  this.totalTestResultsIncrease : this.totalTestResults;                
        }
    }

    static getLabel(dataType: string, daily: boolean = false) : string {
        return daily ? `Daily ${dataType}` : `Total ${dataType}`;
    }


    static adapt(item: any): CovidData {
        return new CovidData(
            item.date,
            item.death,
            item.deathIncrease,
            item.hospitalizedCumulative,
            item.hospitalizedCurrently,
            item.hospitalizedIncrease,
            item.inIcuCumulative,
            item.inIcuCurrently,
            item.onVentilatorCumulative,
            item.onVentilatorCurrently,
            item.positive,
            item.positiveIncrease,
            item.totalTestResults,
            item.totalTestResultsIncrease,
            item.recovered,
            item.name
        )
    }

}