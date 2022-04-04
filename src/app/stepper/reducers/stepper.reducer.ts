import * as StepperActions from '../actions/stepper.actions';

import { Action, createReducer, on } from '@ngrx/store';
import { FormGroupState, createFormGroupState, onNgrxForms } from 'ngrx-forms';

export const stepperFormSlice = 'stepperForm';



export interface State {  
  submittedValue: any | undefined;
}

const initialState: State = {  
  submittedValue: undefined
};

export const stepperReducer = createReducer(
  initialState,
  onNgrxForms(),
  on(StepperActions.SUBMIT_FORM_VALUE, (state, action) => ({
    ...state,
    submittedValue: action.submittedForm
  }))
);

export function reducer(state: State | undefined, action: Action) {
    return stepperReducer(state, action);
}

export const getSubmittedValue = (state: State) => state.submittedValue;

