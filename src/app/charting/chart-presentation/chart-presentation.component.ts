import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { BaseChartDirective, Color, PluginServiceGlobalRegistrationAndOptions } from 'ng2-charts';
import * as moment from 'moment/moment';
import { MediaMatcher } from '@angular/cdk/layout';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-chart-presentation',
  templateUrl: './chart-presentation.component.html',
  styleUrls: ['./chart-presentation.component.scss']
})
export class ChartPresentationComponent implements OnInit, OnDestroy {
  @Input() chartdata: ChartDataSets[];
  @Input() chartLabels: string[]; //moment.Moment[];
  @Input() chartTitle: string = '';
  @Input() lineChartColors: Color[];
  @Input() loading: boolean;
  @Input() chartDataEmpty: boolean = false;
  
  lineChartData: ChartDataSets[] = [
    { data: [], label: 'Infections' },
  ];
  yAxes = true;
  lineChartOptions: ChartOptions = {
    responsive: true,    
    title: {
      display: false,
      text: ''
    },
    scales: {
      xAxes: [{
        type: 'time',
        gridLines: {
          display: true
        },
        time: {
          minUnit: 'month'
        }
      }],
      yAxes: [{
        type: 'linear',
        id: 'left-axis',
        display: this.yAxes,
        position: 'left',
        ticks: {
          min: 0
        },
      }, {
        type: 'linear',
        id: 'right-axis',
        display: this.yAxes,
        position: 'right',
        stacked: false,
        gridLines: { drawOnChartArea: false },
        ticks: {
          min: 0
        }
      }],
    },
    elements: {
      point: {
        radius: 1,
        hitRadius: 4
      }
    },
    plugins: {
      streaming: false // needed to disable streaming from streaming plugin
    }
  };

  @ViewChild('myChart')
  myChart: BaseChartDirective;

  lineChartLegend = true;
  lineChartType = 'line';


  private _mobileQueryListener: () => void;
  private a: any;
  mobileQuery: MediaQueryList;

  constructor(private media: MediaMatcher) { }  //private changeDetectorRef: ChangeDetectorRef

  ngOnDestroy(): void {
    //this.mobileQuery.removeListener(this._mobileQueryListener);
    this.mobileQuery?.removeEventListener('change', this.changeEventListener);    
  }

  ngOnInit(): void {
    this.lineChartData = this.chartdata;
    this.lineChartOptions.title.text = this.chartTitle;
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addEventListener('change', this.changeEventListener);

    this.yAxes = !this.mobileQuery?.matches;
  }

  changeEventListener = function (e: MediaQueryListEvent) {
    this.yAxes = !e.matches;
    this.updateChart(!e.matches);
  }.bind(this);

  /*
    Set chart to remove Y-Axis labels based on the Media Matcher criteria 
  */
  updateChart(displayAxis: boolean) {
    if (this.myChart) {
      this.myChart.chart.options.scales.yAxes[0].display = displayAxis;
      this.myChart.chart.options.scales.yAxes[1].display = displayAxis;
    }
  }

  ngAfterViewInit() {
    this.updateChart(this.yAxes);
  }



}
