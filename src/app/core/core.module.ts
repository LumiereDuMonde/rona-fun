import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

import { A11yModule } from '@angular/cdk/a11y';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CustomErrorStateMatcherDirective } from './material-ngrx-helpers/error-state-matcher';
import { ImagePreloader } from './imagepreloader.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatListOptionFixDirective } from './material-ngrx-helpers/mat-list-option-fix';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { NgrxMatSelectViewAdapter } from './material-ngrx-helpers/mat-select-view-adapter';
import { ReactiveComponentModule } from '@ngrx/component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ImagePreloader,
    NgrxMatSelectViewAdapter,
    CustomErrorStateMatcherDirective,
    MatListOptionFixDirective
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    ImagePreloader,
    ClipboardModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatRadioModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatToolbarModule,
    ScrollingModule,
    ReactiveComponentModule,
    MatSelectModule,
    A11yModule,
    MatMenuModule,
    MatDividerModule,
    MatTableModule,
    NgrxMatSelectViewAdapter,
    CustomErrorStateMatcherDirective,
    MatListOptionFixDirective
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill', float: 'always' }
    }
  ]
})
export class CoreModule {}
