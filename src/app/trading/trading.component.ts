import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradingComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

}
