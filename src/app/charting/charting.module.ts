import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';

import { ChartingRoutingModule } from './charting-routing.module';
import { ChartingComponent } from './charting.component';
import { StoreModule } from '@ngrx/store';
import * as fromCharting from './reducers'
import { EffectsModule } from '@ngrx/effects';
import { ChartingEffects } from './effects/charting.effects';
import { ChartPresentationComponent } from './chart-presentation/chart-presentation.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [ChartingComponent, ChartPresentationComponent],
  imports: [
    CommonModule,
    ChartsModule,
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
    FormsModule ,
    CoreModule
  ]
})
export class ChartingModule { }
