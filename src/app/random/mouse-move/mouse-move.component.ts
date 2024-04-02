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
  iconUrls = ['assets/img/skull.svg','assets/img/cat.svg','assets/img/pumpkin.svg','assets/img/balloon.svg','assets/img/cake.svg','assets/img/bear.svg']; //'assets/img/cat.svg','assets/img/skull.svg','assets/img/pumpkin.svg' ['assets/img/balloon.svg']; //,'assets/img/cake.svg','assets/img/bear.svg'
  mouseDown$ = fromEvent<MouseEvent>(document, 'mousedown');
  // mouse movements, normalizing
  mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove').pipe(
    map((mouseEventToNormalize) => {
      return {
        x: mouseEventToNormalize.clientX,
        y: mouseEventToNormalize.clientY
      };
    })
  );
  mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');
  mousePath$ = this.mouseMove$.pipe(
    skipUntil(this.mouseDown$),
    takeUntil(this.mouseUp$),
    repeat()
  );

  // touch movements, I am ignoring touch start/end currently, normalizing
  touchMove$ = fromEvent<TouchEvent>(document, 'touchmove').pipe(
    map((touchEventToNormalize) => {
      return {
        x: touchEventToNormalize.touches[0].clientX,
        y: touchEventToNormalize.touches[0].clientY
      };
    })
  );

  // controlling events for pause/unpause
  pause$ = fromEvent(document, 'dblclick').pipe(mapTo(false));
  resume$ = fromEvent(document, 'click').pipe(mapTo(true));
  ltrPauseStream$ = merge(this.pause$, this.resume$).pipe(startWith(true));

  // left to right stream, moving a stream of bubbles across the screen in the middle
  // pauses when user double clicks, resumes when they click
  ltrStream$ = interval(10).pipe(
    withLatestFrom(this.ltrPauseStream$),
    filter(([intervalStream$, pauseStreamBoolean$]) => pauseStreamBoolean$), // filter out emissions until unpaused
    map(([intervalStream$, pauseStreamBoolean$]) => intervalStream$),
    timestamp(),
    map((intervalCountWithTimeStamp) => {
      const width = window.innerWidth;
      const increment = width / 750; // takes 7.5 seconds to move across screen
      let xPos = increment * intervalCountWithTimeStamp.value; // find where we are at left to right
      xPos = xPos > width ? xPos % width : xPos; // went past far edge, adjust
      return {
        x: xPos,
        y: window.innerHeight / 2,
        timestamp: intervalCountWithTimeStamp.timestamp
      } as StartPosition;
    })
  );

  bubbleItemToDestroy$ = new Subject<StartPosition>();
  followMouseCursorOrTouches$ = merge(this.mouseMove$, this.touchMove$).pipe(
    throttleTime(20),
    timestamp(),
    map((screenCoordsWithTimeStamp) => {
      return {
        x: screenCoordsWithTimeStamp.value.x,
        y: screenCoordsWithTimeStamp.value.y,
        timestamp: screenCoordsWithTimeStamp.timestamp
      } as StartPosition;
    })
  );

  bubbleFun$ = merge(this.followMouseCursorOrTouches$, this.ltrStream$,  this.bubbleItemToDestroy$).pipe(
    scan((acc: StartPosition[], value: StartPosition) => {
      return acc.includes(value)
        ? acc.filter((x) => x != value)
        : [...acc, value];
    }, [] as StartPosition[])
  );

  constructor() {}

  ngOnInit(): void {}

  destroyItem(item) {
    this.bubbleItemToDestroy$.next(item);
  }
}
