import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import { map, repeat, skipUntil, takeUntil, tap, throttleTime, timestamp, toArray, withLatestFrom } from 'rxjs/operators';

import { StartPosition } from '../core/dynamic-animate.directive';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-mouse-move',
  templateUrl: './mouse-move.component.html',
  styleUrls: ['./mouse-move.component.scss']
})
export class MouseMoveComponent implements OnInit, AfterViewInit {
  isShowing = false;
  mouseDown$ = fromEvent<MouseEvent>(document, 'mousedown');
  mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
  mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');
  mousePath$ = this.mouseMove$.pipe(
    skipUntil(this.mouseDown$),
    takeUntil(this.mouseUp$),
    repeat()
  );

  bubbleFun$ = this.mouseMove$.pipe(
    throttleTime(100),
    timestamp(),
    map(x => {return { x: x.value.clientX, y: x.value.clientY, timestamp: x.timestamp } as StartPosition}),
    tap(x => console.log(x)),
    toArray()
  );

  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;

  public context: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
  }

  constructor() {}

  getMousePos(evt: MouseEvent) {
    const canvas = this.canvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
      y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height
    };
  }

  ngOnInit(): void {
    this.mousePath$
      .pipe(withLatestFrom(this.mouseDown$))
      .subscribe(([a, b]) => {
        const current = this.getMousePos(a);
        const start = this.getMousePos(b);
        this.clearCanvas();
        this.drawTop(this.context, start.x, start.y, current.x, current.y);
      });
  }

  drawTop(topCtx: CanvasRenderingContext2D, lX, lY, cX, cY) {
    this.canvas.nativeElement.style.height =
      this.canvas.nativeElement.height / window.devicePixelRatio + 'px';
    this.canvas.nativeElement.style.width =
      this.canvas.nativeElement.width / window.devicePixelRatio + 'px';

    topCtx.lineWidth = 3;
    // line from
    topCtx.moveTo(lX, lY);
    // to
    topCtx.lineTo(cX, cY);
    // color
    topCtx.strokeStyle = '#ff0';
    // draw it
    topCtx.stroke();
    topCtx.setTransform(1, 0, 0, 1, 0, 0);
  }

  fix_dpi(canvas) {
    //create a style object that returns width and height
    const dpi = window.devicePixelRatio;
    let style = {
      height() {
        return +getComputedStyle(canvas)
          .getPropertyValue('height')
          .slice(0, -2);
      },
      width() {
        return +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
      }
    };
    //set the correct attributes for a crystal clear image!
    canvas.setAttribute('width', (style.width() * dpi).toString());
    canvas.setAttribute('height', (style.height() * dpi).toString());
  }

  clearCanvas() {
    this.context.save();

    // Use the identity matrix while clearing the canvas
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );

    // Restore the transform
    this.context.restore();
    this.context.beginPath();
    this.fix_dpi(this.canvas.nativeElement);
  }

  destroyItem(item) {
    console.log(item);
  }
}
