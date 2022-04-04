import {
  FormGroupState,
  createFormGroupState,
  onNgrxForms,
  updateGroup,
  validate,
  wrapReducerWithFormStateUpdate
} from 'ngrx-forms';
import { equalTo, notEqualTo, pattern, required } from 'ngrx-forms/validation';

import { createReducer } from '@ngrx/store';
import { passwordValidators } from 'src/app/core/material-ngrx-helpers/validation.ngrx-forms';

export const signupFormSlice = 'signup';

export interface SignupFormValue {
  email: string;
  password: string;
  passwordConfirm: string;
}

export const validateAndUpdateFormState = updateGroup<SignupFormValue>({
  email: validate(required, pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)),
  password: (password, form) => {
    return validate(password, [
      ...passwordValidators,
      notEqualTo(form.value.email)
    ]);
  },
  passwordConfirm: (passwordConfirm, form) => {
    return validate(passwordConfirm, [required, equalTo(form.value.password)]);
  }
});

export const FORM_INITIAL_STATE = createFormGroupState<SignupFormValue>(
  signupFormSlice,
  {
    email: '',
    password: '',
    passwordConfirm: ''
  }
);

export interface State {
  signupForm: FormGroupState<SignupFormValue>;
}

const initialState: State = {
    signupForm: FORM_INITIAL_STATE
};

export const rawReducer = createReducer(initialState, onNgrxForms());

export const reducer = wrapReducerWithFormStateUpdate(
    rawReducer,
    // point to the form state to update
    s => s.signupForm,
    // this function is always called after the reducer
    validateAndUpdateFormState,
  );

export const getSignupForm = (state: State) => state.signupForm;
