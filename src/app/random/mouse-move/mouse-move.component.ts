import { Subject, fromEvent, merge } from 'rxjs';
import {
  map,
  repeat,
  scan,
  skipUntil,
  takeUntil,
  throttleTime,
  timestamp
} from 'rxjs/operators';

import { Component } from '@angular/core';
import { StartPosition } from '../core/dynamic-animate.directive';

@Component({
  selector: 'app-mouse-move',
  templateUrl: './mouse-move.component.html',
  styleUrls: ['./mouse-move.component.scss']
})
export class MouseMoveComponent {
  mouseDown$ = fromEvent<MouseEvent>(document, 'mousedown');
  mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
  mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');
  mousePath$ = this.mouseMove$.pipe(
    skipUntil(this.mouseDown$),
    takeUntil(this.mouseUp$),
    repeat()
  );

  bubbleEnd$ = new Subject<StartPosition>();
  bubbleStart$ = this.mouseMove$.pipe(
    throttleTime(20),
    timestamp(),
    map((x) => {
      return {
        x: x.value.clientX,
        y: x.value.clientY,
        timestamp: x.timestamp
      } as StartPosition;
    })
  );

  bubbleFun$ = merge(this.bubbleStart$, this.bubbleEnd$).pipe(
    scan((acc: StartPosition[], value: StartPosition) => {
      return acc.includes(value)
        ? acc.filter((x) => x != value)
        : [...acc, value];
    }, [] as StartPosition[])
  );

  constructor() {}

  ngOnInit(): void {}

  destroyItem(item) {
    this.bubbleEnd$.next(item);
  }
}
