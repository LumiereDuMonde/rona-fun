import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartPoint } from 'chart.js';
import 'chartjs-plugin-streaming';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITrade } from '../../models/trade.model';
import * as fromTrading from '../../reducers';

@Component({
  selector: 'app-trade-chart',
  templateUrl: './trade-chart.component.html',
  styleUrls: ['./trade-chart.component.scss']
})
export class TradeChartComponent implements OnInit,AfterViewInit {
  lastTrade$: Observable<ITrade[]>;
  lastTrade: ITrade[];

  @ViewChild('tradeChart')
  tradeChart: BaseChartDirective;

  datasets: any[] = [{
    label: 'Bitcoin ($)',
    fill: false,
    backgroundColor: 'rgba(0, 0, 0)',
    borderColor: 'rgba(255,243,222)',    
    data: [
    ],
    lineTension: 0.0
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
      yAxes:[{
        gridLines: {
          color: 'rgb(200,200,200,0.5)',
          display: true
        }        
      }]      
    },
    elements: {
      point: {
        radius: 1,
        hitRadius: 4
      }
    }
  };


  constructor(private store: Store) { }

  ngAfterViewInit(): void {
    this.lastTrade$.subscribe((trades) => {
      this.lastTrade = [...trades];

      trades.forEach((value) => {        
        (this.datasets[0].data as ChartPoint[]).push({
          x: Date.now(),
          y: +value.price
        });
      });
      // append the new data to the existing chart data              
      this.tradeChart.update('none');
    });
  }  

  ngOnInit(): void {
    this.lastTrade$ = this.store.select(fromTrading.selectLastTrade);
  }

}
