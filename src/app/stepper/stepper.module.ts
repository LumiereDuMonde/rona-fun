import * as fromStepper from './reducers';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { StepperComponent } from './stepper.component';
import { StepperRoutingModule } from './stepper-routing.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [StepperComponent],
  imports: [
    CommonModule,   
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    NgrxFormsModule,
    StepperRoutingModule,
    StoreModule.forFeature(fromStepper.stepperFeatureKey, fromStepper.reducers)    
 //   EffectsModule.forFeature([TrafficEffects]),     
  ]
})
export class StepperModule { }
