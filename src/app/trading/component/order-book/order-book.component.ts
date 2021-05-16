import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss']
})
export class OrderBookComponent implements OnInit {
  @Input() orderBook: Observable<Array<Array<number>>> = [][3];
  @Input() isBid: boolean = false;
  displayedColumns: string[] = ['price', 'volume', 'date'];

  constructor() { }

  ngOnInit(): void {
  }

}
