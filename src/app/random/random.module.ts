import { CommonModule } from '@angular/common';
import { DynamicAnimateDirective } from './core/dynamic-animate.directive';
import { MouseMoveComponent } from './mouse-move/mouse-move.component';
import { NgModule } from '@angular/core';
import { RandomComponent } from './random.component';
import { RandomRoutingModule } from './random-routing.module';

@NgModule({
  declarations: [RandomComponent, MouseMoveComponent, DynamicAnimateDirective],
  imports: [
    CommonModule,
    RandomRoutingModule
  ]
})
export class RandomModule { }
