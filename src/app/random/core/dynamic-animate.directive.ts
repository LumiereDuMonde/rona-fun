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
  x: number;
  y: number;
  timestamp: number;
}

enum PositionSelector {
  X,
  Y
}

export enum EasingType {
  ease = 'ease',
  easeIn = 'ease-in',
  easeOut = 'ease-out',
  easeInOut = 'ease-in-out',
  linear = 'linear'
}

@Directive({
  selector: '[appDynamicAnimate]'
})
export class DynamicAnimateDirective implements AfterViewInit {
  @Input() startPosition: StartPosition = { x: 0, y: 0, timestamp: 0 };
  @Input() imageUrls: string[] = [];
  @Input() duration: number = 4000;
  @Input() easing: EasingType = EasingType.linear;
  @Input() opacity: number = 0.4;
  @Output() dynamicAnimationDone: EventEmitter<void> = new EventEmitter<void>();

  randomNumber(min = 0, max = 255) {
    return Math.random() * (max - min) + min;
  }

  getRandomInt(min = 0, max = 255) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateRGB() {
    return `rgb(${this.getRandomInt()},${this.getRandomInt()},${this.getRandomInt()})`;
  }

  generateScale() {
    return `scale(${this.randomNumber(0.5, 4)})`;
  }

  randomNumberFromStartPos(
    min: number,
    max: number,
    sel: PositionSelector = PositionSelector.X
  ) {
    const offset =
      sel === PositionSelector.X ? this.startPosition.x : this.startPosition.y;
    return this.randomNumber(min, max) + offset;
  }

  generateTranslate() {
    return `translate(${this.getRandomInt(-400, 400)}px,${this.getRandomInt(
      -400,
      400
    )}px)`;
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
    const obj = this.createAnimateObj()
    return [
      animate(
        this.duration+'ms '+this.easing,
        style(obj)
      )
    ];
  }

  private createAnimateObj() {
    let styleObj: any = {};
    styleObj.opacity = this.opacity;
    if (this.imageUrls.length === 0) {
      styleObj.background = this.generateRGB();
    }
    styleObj.transform = this.generateTranslateWithScale();
    return styleObj;
  }

  private getBackgroundUrl() {
     console.log(this.imageUrls);
     console.log(this.getRandomInt(0, this.imageUrls.length-1));
     return `url(${this.imageUrls[this.getRandomInt(0, this.imageUrls.length-1)]}) center center / cover no-repeat`;
  }

  ngAfterViewInit(): void {
    // position the element
    this.el.nativeElement.style.setProperty('position', 'fixed');
    this.el.nativeElement.style.setProperty('top', `${this.startPosition.y}px`);
    this.el.nativeElement.style.setProperty(
      'left',
      `${this.startPosition.x}px`
    );
    let backgroundStr: string;
    // determine what it will look like
    if (this.imageUrls.length > 0) {
      // use an image
      backgroundStr = this.getBackgroundUrl();
    } else {
      // use a random color
      backgroundStr = this.generateRGB();
    }
    this.el.nativeElement.style.setProperty(
      'background',
      backgroundStr
    );

    // animate it
    this.playAnimation(this.getMouseAnimation());
  }
}
