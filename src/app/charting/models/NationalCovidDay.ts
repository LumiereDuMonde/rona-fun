import { Injectable } from "@angular/core";
import { Adapter } from "src/app/core/adapter";

export class NationalCovidDay {
    date: Date;
    dateChecked: Date;
    lastModified: Date;
    constructor(_date: number, 
        public states: number,
        public positive: number, 
        public negative: number, 
        public pending: number,
        public hospitalizedCurrently: number,
        public hospitalizedCumulative: number,
        public inIcuCurrently: number,
        public inIcuCumulative: number,
        public onVentilatorCurrently: number,
        public onVentilatorCumulative: number,
        _dateChecked: string,
        public death: number,
        public hospitalized: number,
        public totalTestResults: number,
        _lastModified: string,
        public recovered: any,
        public total: number,
        public posNeg: number,
        public deathIncrease: number,
        public hospitalizedIncrease: number,
        public negativeIncrease: number,
        public positiveIncrease: number,
        public totalTestResultsIncrease: number,
        public hash: string
        ) {
            try {
                this.date = new Date( _date / 10000,  _date % 10000 / 100-1,  _date % 100); 
                  
            } catch (error) {
                console.log(`Error in date conversion, National Covid Day adapter ${error}`);
            }
            
            this.lastModified = new Date(_lastModified);
            this.dateChecked = new Date(_dateChecked);
        }
        
}

@Injectable({
    providedIn: "root",
  })
  export class NationalCovidDayAdapter implements Adapter<NationalCovidDay> {
     adapt(item: any): NationalCovidDay {
      return new NationalCovidDay(item.date, 
        item.states, 
        item.positive, 
        item.negative, 
        item.pending,
        item.hostpitalizedCurrently,
        item.hospitalizedCumulative,
        item.inIcuCurrently,
        item.inIcuCumulative,
        item.onVentilatorCurrently,
        item.onVentilatorCumulative,
        item.dateChecked,
        item.death,
        item.hospitalized,
        item.totalTestResults,
        item.lastModified,
        item.recovered,
        item.total,
        item.posNeg,
        item.deathIncrease,
        item.hospitalizedIncrease,
        item.negativeIncrease,
        item.positiveIncrease,
        item.totalTestResultsIncrease,
        item.hash);
    }
  }