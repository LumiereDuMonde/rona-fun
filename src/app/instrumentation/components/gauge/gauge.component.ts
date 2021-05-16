import { Component, Input, OnInit } from '@angular/core';
import { NgxGaugeCap, NgxGaugeType } from 'ngx-gauge/gauge/gauge';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit {

  @Input() title = '' ;
  @Input() min = 0;
  @Input() max = 0;
  @Input() label = '';
  @Input() value = 0
  @Input() unit = '';
  @Input() threshold = {};
  @Input() type:NgxGaugeType  = 'arch';
  cap: NgxGaugeCap = 'round';
  thick = 9;
  backgroundColor = 'white';

  constructor() { }

  ngOnInit(): void {
  }

}
