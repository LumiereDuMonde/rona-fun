import 'chartjs-plugin-streaming';

import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { ChartPoint } from 'chart.js';
import { ITrade } from '../../models/trade.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-trade-chart',
  templateUrl: './trade-chart.component.html',
  styleUrls: ['./trade-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeChartComponent {
  @Input() set trades(value: Observable<ITrade[]>) {
    this.trades$ = value.pipe(
      tap((trades) => {
      if (!trades) return;

      this.lastTrade = [...trades];
      trades.forEach((value, index) => {
        //price
        (this.datasets[0].data as ChartPoint[]).push({
          x: +value.time * 1000,
          y: +value.price
        });

        //volume
        if (index === 0) {
          (this.datasets[1].data as ChartPoint[]).push({
            x: +value.time * 1000,
            y: +value.volume
          });
        } else {
          this.datasets[1].data[this.datasets[1].data.length - 1].y += +value.volume;
        }

      });
      // append the new data to the existing chart data
      this.tradeChart?.update('none');
    }));
  }

  trades$: Observable<ITrade[]> | null;
  lastTrade: ITrade[]= [];

  @ViewChild('tradeChart')
  tradeChart?: BaseChartDirective;

  datasets: any[] = [{
    label: 'Bitcoin ($)',
    fill: false,
    backgroundColor: 'rgba(0, 0, 0)',
    borderColor: 'rgba(255,243,222)',
    data: [
    ],
    lineTension: 0.0,
    yAxisID: 'left-axis'
  }, {
    label: 'Volume',
    data: [],
    type: 'bar',
    yAxisID: 'right-axis',
    barThickness: 3
  }];

  plugins: [
    streaming: {          // per-chart option
      frameRate: 30       // chart is drawn 30 times every second
    }
  ]

  interaction: {
    intersect: false
  }

  lineChartOptions: any = {
    responsive: true,
    title: {
      display: false,
      text: ''
    },
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          duration: 60000,
          refresh: 200,
          delay: 100,
          pause: false,
          ttl: 120000,
        },
        gridLines: {
          color: 'rgb(200,200,200,0.5)',
          display: true
        }
      }],
      yAxes: [{
        type: 'linear',
        position: 'left',
        display: true,
        id: 'left-axis',
        gridLines: {
          color: 'rgb(200,200,200,0.5)',
          display: true
        }
      },
      {
        type: 'linear',
        id: 'right-axis',
        position: 'right',
        stacked: false,
        display: true,
        gridLines: { drawOnChartArea: false },
        ticks: {
          min: 0
        }
      }
      ]
    },
    elements: {
      point: {
        radius: 3,
        hitRadius: 4
      }
    }
  };

  constructor() {}
}
