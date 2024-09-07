import 'chartjs-plugin-streaming';

import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { ChartPoint } from 'chart.js';
import { ITrade } from '../../models/trade.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

declare module 'chart.js' {
  interface ChartPoint {
    volume?: number;
  }
}

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
        this.updateChartData(trades);
      })
    );
  }

  trades$: Observable<ITrade[]> | null;
  lastTrade: ITrade[] = [];

  @ViewChild('tradeChart')
  tradeChart?: BaseChartDirective;

  datasets: any[] = [
    {
      label: 'Bitcoin ($)',
      fill: false,
      backgroundColor: 'rgba(75, 192, 192, 0.4)',
      borderColor: 'rgba(75, 192, 192, 1)',
      data: [],
      lineTension: 0.2,
      yAxisID: 'left-axis',
      pointRadius: 2,
      pointHoverRadius: 5
    },
    {
      label: 'Volume',
      data: [],
      type: 'bar',
      yAxisID: 'right-axis',
      backgroundColor: 'rgba(255, 99, 132, 0.4)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      barThickness: 4
    }
  ];

  lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        type: 'realtime',
        realtime: {
          duration: 60000,
          refresh: 1000,
          delay: 1000,
          onRefresh: this.onRefresh.bind(this)
        },
        gridLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          fontColor: '#a0aec0',
        }
      }],
      yAxes: [
        {
          id: 'left-axis',
          position: 'left',
          gridLines: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
          ticks: {
            fontColor: '#a0aec0',
          }
        },
        {
          id: 'right-axis',
          position: 'right',
          gridLines: { 
            drawOnChartArea: false,
            color: 'rgba(255, 255, 255, 0.1)',
          },
          ticks: {
            fontColor: '#a0aec0',
          }
        }
      ]
    },
    plugins: {
      streaming: {
        frameRate: 30
      }
    },
    tooltips: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleFontColor: '#e2e8f0',
      bodyFontColor: '#e2e8f0',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderWidth: 1
    }
  };

  constructor() {}

  private updateChartData(trades: ITrade[]): void {
    trades.forEach((trade, index) => {
      this.datasets[0].data.push({
        x: +trade.time * 1000,
        y: +trade.price,
        volume: +trade.volume
      });

      if (index === 0) {
        this.datasets[1].data.push({
          x: +trade.time * 1000,
          y: +trade.volume
        });
      } else {
        this.datasets[1].data[this.datasets[1].data.length - 1].y += +trade.volume;
      }
    });

    this.tradeChart?.update('none');
  }

  private onRefresh(chart: any): void {
    const now = Date.now();
    this.datasets.forEach(dataset => {
      dataset.data = dataset.data.filter((point: ChartPoint) => {
        return typeof point.x === 'number' && point.x > now - 60000;
      });
    });
  }

  private tooltipCallback(tooltipItem: any, data: any): string[] {
    const datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
    const value = tooltipItem.yLabel;
    
    if (datasetLabel === 'Bitcoin ($)') {
      const volume = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].volume;
      return [
        `${datasetLabel}: $${value.toFixed(2)}`,
        `Volume: ${volume.toFixed(5)}`
      ];
    } else if (datasetLabel === 'Volume') {
      return [`${datasetLabel}: ${value.toFixed(5)}`];
    }
    return [];
  }
}
