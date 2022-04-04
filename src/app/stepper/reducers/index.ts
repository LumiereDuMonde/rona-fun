import * as fromRoot from '../../store/app.reducer';
import * as fromSignup from './signup.reducer';
import * as fromStepper from './stepper.reducer';
import * as fromUser from './user.reducer';

import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

export const stepperFeatureKey = 'stepper';

export interface StepperState {
  [fromStepper.stepperFormSlice]: fromStepper.State;
  [fromSignup.signupFormSlice]: fromSignup.State;
  [fromUser.userFormSlice]: fromUser.State;
}

export interface State extends fromRoot.State {
  [stepperFeatureKey]: StepperState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: StepperState | undefined, action: Action) {
  return combineReducers({
    [fromStepper.stepperFormSlice]: fromStepper.reducer,
    [fromSignup.signupFormSlice]: fromSignup.reducer,
    [fromUser.userFormSlice]: fromUser.reducer
  })(state, action);
}

export const selectStepperState = createFeatureSelector<State, StepperState>(
  stepperFeatureKey
);

//stepper
export const selectStepperFormState = createSelector(
  selectStepperState,
  (state) => state.stepperForm
);

export const selectSubmittedValue = createSelector(
  selectStepperFormState,
  fromStepper.getSubmittedValue
);

//signup
export const selectSignupFormState = createSelector(
  selectStepperState,
  (state) => state.signup
);

export const selectSignupForm = createSelector(
  selectSignupFormState,
  fromSignup.getSignupForm
);

//user
export const selectUserFormState = createSelector(
  selectStepperState,
  (state) => state.user
);

export const selectUserForm = createSelector(
  selectUserFormState,
  fromUser.getUserForm
);

export const selectFirstName = createSelector(
  selectUserFormState,
  fromUser.getFirstName
);

export const selectMiddleName = createSelector(
  selectUserFormState,
  fromUser.getMiddleName
);

export const selectLastName = createSelector(
  selectUserFormState,
  fromUser.getLastName
);
