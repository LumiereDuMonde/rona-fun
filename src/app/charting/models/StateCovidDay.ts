import { Injectable } from "@angular/core";
import { Adapter } from "src/app/core/adapter";

export class StateCovidDay {
    date: Date;
    dateChecked: Date;
    dateModified: Date;
    constructor(
        _date: number,
        _dateChecked: string,
        _dateModified: string,
        public state: string,
        public positive: number,
        public probableCases: number,
        public negative: number,
        public pending: number,
        public totalTestResultsSource: string,
        public totalTestResults: number,
        public hospitalizedCurrently: number,
        public hospitalizedCumulative: number,
        public inIcuCurrently: number,
        public inIcuCumulative: number,
        public onVentilatorCurrently: number,
        public onVentilatorCumulative: number,
        public recovered: number,
        public lastUpdateEt: string,
        public checkTimeEt: string,
        public death: number,
        public hospitalized: number,
        public hospitalizedDischarged: number,
        public totalTestsViral: number,
        public positiveTestsViral: number,
        public negativeTestsViral: number,
        public positiveCasesViral: number,
        public deathConfirmed: number,
        public deathProbable: number,
        public totalTestEncountersViral: number,
        public totalTestsPeopleViral: number,
        public totalTestsAntibody: number,
        public positiveTestsAntibody: number,
        public negativeTestsAntibody: number,
        public totalTestsPeopleAntibody: number,
        public positiveTestsPeopleAntibody: number,
        public negativeTestsPeopleAntibody: number,
        public totalTestsPeopleAntigen: number,
        public positiveTestsPeopleAntigen: number,
        public totalTestsAntigen: number,
        public positiveTestsAntigen: number,
        public fips: string,
        public positiveIncrease: number,
        public negativeIncrease: number,
        public total: number,
        public totalTestResultsIncrease: number,
        public posNeg: number,
        public dataQualityGrade: string,
        public deathIncrease: number,
        public hospitalizedIncrease: number,
        public hash: string,
        public commercialScore: number,
        public negativeRegularScore: number,
        public negativeScore: number,
        public positiveScore: number,
        public score: number,
        public grade: string,
    ) {
        try {
            this.date = new Date(_date / 10000, _date % 10000 / 100 - 1, _date % 100);

        } catch (error) {
            console.log(`Error in date conversion, National Covid Day adapter ${error}`);
        }

        this.dateModified = new Date(_dateModified);
        this.dateChecked = new Date(_dateChecked);
    }
}

@Injectable({
    providedIn: "root",
})
export class StateCovidDayAdapter implements Adapter<StateCovidDay> {
    adapt(item: any): StateCovidDay {
        return new StateCovidDay(item.date,
            item.dateChecked,
            item.dateModified,
            item.state,
            item.positive,
            item.probableCases,
            item.negative,
            item.pending,
            item.totalTestResultsSource,
            item.totalTestResults,
            item.hospitalizedCurrently,
            item.hospitalizedCumulative,
            item.inIcuCurrently,
            item.inIcuCumulative,
            item.onVentilatorCurrently,
            item.onVentilatorCumulative,
            item.recovered,
            item.lastUpdateEt,
            item.checkTimeEt,
            item.death,
            item.hospitalized,
            item.hospitalizedDischarged,
            item.totalTestsViral,
            item.positiveTestsViral,
            item.negativeTestsViral,
            item.positiveCasesViral,
            item.deathConfirmed,
            item.deathProbable,
            item.totalTestEncountersViral,
            item.totalTestsPeopleViral,
            item.totalTestsAntibody,
            item.positiveTestsAntibody,
            item.negativeTestsAntibody,
            item.totalTestsPeopleAntibody,
            item.positiveTestsPeopleAntibody,
            item.negativeTestsPeopleAntibody,
            item.totalTestsPeopleAntigen,
            item.positiveTestsPeopleAntigen,
            item.totalTestsAntibody,
            item.positiveTestsAntigen,
            item.fips,
            item.positiveIncrease,
            item.negativeIncrase,
            item.total,
            item.totalTestResultsIncrease,
            item.posNeg,
            item.dataQualityGrade,
            item.deathIncrease,
            item.hospitalizedIncrease,
            item.hash,
            item.commercialScore,
            item.negativeRegularScore,
            item.negativeScore,
            item.positiveScore,
            item.score,
            item.grade
        );
    }
}