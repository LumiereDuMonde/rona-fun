import { Subject, fromEvent, interval, merge } from 'rxjs';
import {
  filter,
  map,
  mapTo,
  repeat,
  scan,
  skipUntil,
  startWith,
  takeUntil,
  tap,
  throttleTime,
  timestamp,
  withLatestFrom
} from 'rxjs/operators';

import { Component } from '@angular/core';
import { StartPosition } from '../core/dynamic-animate.directive';

@Component({
  selector: 'app-mouse-move',
  templateUrl: './mouse-move.component.html',
  styleUrls: ['./mouse-move.component.scss']
})
export class MouseMoveComponent {
  // partyUrls = ['assets/img/balloon.svg']; //,'assets/img/cake.svg','assets/img/bear.svg'
  // partyUrls = ['assets/img/skull.svg']; //'assets/img/cat.svg','assets/img/skull.svg','assets/img/pumpkin.svg'
  mouseDown$ = fromEvent<MouseEvent>(document, 'mousedown');
  // mouse movements
  mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
    map((x) => {
      return {
        x: x.clientX,
        y: x.clientY
      };
    })
  );
  mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');
  mousePath$ = this.mouseMove$.pipe(
    skipUntil(this.mouseDown$),
    takeUntil(this.mouseUp$),
    repeat()
  );

  // touch movements, I am ignoring touch start/end currently
  touchMove$ = fromEvent<TouchEvent>(document, 'touchmove').pipe(
    map((x) => {
      return {
        x: x.touches[0].clientX,
        y: x.touches[0].clientY
      };
    })
  );

  pause$ = fromEvent(document, 'dblclick').pipe(mapTo(false));
  resume$ = fromEvent(document, 'click').pipe(mapTo(true));
  ltrPauseStream$ = merge(this.pause$, this.resume$).pipe(
    startWith(true),
    tap(x => console.log)
  );

  // left to right stream, moving a stream of bubbles across the screen in the middle
  // pauses when user double clicks, resumes when they click
  ltrStream$ = interval(10).pipe(
    withLatestFrom(this.ltrPauseStream$),
    filter(([a,b]) => b),
    map(([a,b]) => a),
    timestamp(),
    map((x) => {
      const width = window.innerWidth;
      const increment = width / 750; // takes 7.5 seconds to move across screen
      let xPos = increment * x.value; // find where we are at left to right
      xPos = xPos > width ? xPos % width : xPos; // went past far edge, adjust
      return {
        x: xPos,
        y: window.innerHeight / 2,
        timestamp: x.timestamp
      } as StartPosition;
    })
  );

  bubbleEnd$ = new Subject<StartPosition>();
  bubbleStart$ = merge(this.mouseMove$, this.touchMove$).pipe(
    throttleTime(20),
    timestamp(),
    map((x) => {
      return {
        x: x.value.x,
        y: x.value.y,
        timestamp: x.timestamp
      } as StartPosition;
    })
  );

  bubbleFun$ = merge(this.bubbleStart$, this.bubbleEnd$, this.ltrStream$).pipe(
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
