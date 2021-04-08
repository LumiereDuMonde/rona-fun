import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartingRoutingModule } from './charting-routing.module';
import { ChartingComponent } from './charting.component';
import { StoreModule } from '@ngrx/store';
import * as fromCharting from './reducers'
import { EffectsModule } from '@ngrx/effects';
import { ChartingEffects } from './effects/charting.effects';


@NgModule({
  declarations: [ChartingComponent],
  imports: [
    CommonModule,
    ChartingRoutingModule,
    /**
         * StoreModule.forFeature is used for composing state
         * from feature modules. These modules can be loaded
         * eagerly or lazily and will be dynamically added to
         * the existing state.
         */
    StoreModule.forFeature(fromCharting.chartFeatureKey, fromCharting.reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([ChartingEffects]),
  ]
})
export class ChartingModule { }
