import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  AnimationBuilder,
  AnimationMetadata,
  animate,
  style
} from '@angular/animations';

export interface StartPosition {
  x: number,
  y: number,
  timestamp: number
}

enum PositionSelector {
  X,
  Y
}

@Directive({
  selector: '[appDynamicAnimate]'
})
export class DynamicAnimateDirective implements AfterViewInit {
  @Input() startPosition: StartPosition = { x: 0, y: 0, timestamp: 0 };
  @Output() dynamicAnimationDone: EventEmitter<void> = new EventEmitter<void>()
  randomNumber(min = 0, max = 255) {
    return Math.random() * (max - min) + min;
  }
  generateRGB() {
    return `rgb(${this.randomNumber()},${this.randomNumber()},${this.randomNumber()})`
  }

  generateScale() {
    return `scale(${this.randomNumber(0.5,4)})`
  }

  randomNumberFromStartPos(min: number, max: number, sel: PositionSelector = PositionSelector.X) {
    const offset = sel === PositionSelector.X ? this.startPosition.x : this.startPosition.y;
    return this.randomNumber(min,max) + offset;
  }

  generateTranslate() {
    return `translate(${this.randomNumber(-400,400)}px,${this.randomNumber(-400,400)}px)`;
  }

  generateTranslateWithScale() {
    return this.generateTranslate() + ' ' + this.generateScale();
  }

  constructor(private builder: AnimationBuilder, private el: ElementRef) {}

  private playAnimation(animationMetaData: AnimationMetadata[]): void {
    const animation = this.builder.build(animationMetaData);
    const player = animation.create(this.el.nativeElement);
    player.onDone(() => {
      this.dynamicAnimationDone.emit();
    });
    player.play();
  }

  private getMouseAnimation(): AnimationMetadata[] {
    return [
      animate('4000ms linear', style({ opacity: 0.4, background: this.generateRGB() , transform: this.generateTranslateWithScale()}))
    ];
  }

  ngAfterViewInit(): void {
    this.el.nativeElement.style.setProperty('position', 'fixed');
    this.el.nativeElement.style.setProperty('top', `${this.startPosition.y}px`);
    this.el.nativeElement.style.setProperty('left', `${this.startPosition.x}px`);
    this.el.nativeElement.style.setProperty('background', `${this.generateRGB()}`);
    this.playAnimation(this.getMouseAnimation());
  }
}
