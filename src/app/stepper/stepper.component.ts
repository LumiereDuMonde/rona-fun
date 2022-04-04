import * as StepperActions from './actions/stepper.actions';
import * as fromStepper from './reducers';

import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

import { FormGroupState } from 'ngrx-forms';
import { Observable } from 'rxjs';
import { SignupFormValue } from './reducers/signup.reducer';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  signupForm$: Observable<FormGroupState<SignupFormValue>>;
  submittedValue$: Observable<any | undefined>;

  constructor(private store: Store<fromStepper.State>) {
    this.signupForm$ = store.pipe(select(fromStepper.selectSignupForm));
    this.submittedValue$ = store.pipe(select(fromStepper.selectSubmittedValue));
  }

  ngOnInit(): void {
  }

  submit() {
    this.signupForm$.pipe(
      take(1),
      map(fs => StepperActions.SUBMIT_FORM_VALUE({ submittedForm: fs.value })),
    ).subscribe(this.store);    
  }

}
