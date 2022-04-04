import { ROOT_REDUCERS, metaReducers } from './store/app.reducer';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ChartingEffects } from './charting/effects/charting.effects';
import { ChartsModule } from 'ng2-charts';
import { CoreModule } from './core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { NavbarContainerComponent } from './home/navbar/container/navbar-container/navbar-container.component';
import { NavbarPresentationComponent } from './home/navbar/component/navbar-presentation/navbar-presentation.component';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,    
    NavbarContainerComponent,
    NavbarPresentationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        // strictStateImmutability and strictActionImmutability are enabled by default
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    EffectsModule.forRoot([ChartingEffects]),
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument({
      name: 'Rona Fun',      
    }) : [],
    ChartsModule,
    CoreModule,
    AuthModule    
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
