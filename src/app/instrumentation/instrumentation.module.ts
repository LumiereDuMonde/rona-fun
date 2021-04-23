import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentationRoutingModule } from './instrumentation-routing.module';
import { InstrumentationComponent } from './instrumentation.component';
import { CoreModule } from '../core/core.module';
import { NgxGaugeModule } from 'ngx-gauge';
import { PanelContainerComponent } from './containers/panel-container/panel-container.component';
import { GaugeComponent } from './components/gauge/gauge.component';
import { StoreModule } from '@ngrx/store';
import * as fromInstruments from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { InstrumentationEffects } from './effects/instrumentation.effects';



@NgModule({
  declarations: [InstrumentationComponent, PanelContainerComponent, GaugeComponent],
  imports: [
    CommonModule,
    InstrumentationRoutingModule, 
    StoreModule.forFeature(fromInstruments.instrumentFeatureKey, fromInstruments.reducers),    
    EffectsModule.forFeature([InstrumentationEffects]),     
    CoreModule,
    NgxGaugeModule,   
  ]
})
export class InstrumentationModule { }
