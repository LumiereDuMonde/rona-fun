import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from "@angular/router";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './reducers';
import { AuthEffects } from './effects/auth.effects';
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [AuthComponent],
  imports: [    
    CommonModule,
    CoreModule,
    FormsModule,
    RouterModule,
    AuthRoutingModule,
    StoreModule.forFeature({
      name: fromAuth.authFeatureKey,
      reducer: fromAuth.reducers,
    }),
    EffectsModule.forFeature([AuthEffects]),            
  ]
})
export class AuthModule { }


