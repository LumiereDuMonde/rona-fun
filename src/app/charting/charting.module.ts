import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

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
    StoreModule.forFeature(fromCharting.chartFeatureKey, fromCharting.reducers),
 
    EffectsModule.forFeature([ChartingEffects]),
    FormsModule ,
    CoreModule
  ]
})
export class ChartingModule { }
