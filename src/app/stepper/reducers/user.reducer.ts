import {
  FormGroupState,
  createFormGroupState,
  onNgrxForms,
  updateGroup,
  validate,
  wrapReducerWithFormStateUpdate
} from 'ngrx-forms';

import { createReducer } from '@ngrx/store';
import { required } from 'ngrx-forms/validation';

export const userFormSlice = 'user';

export interface UserFormValue {
  firstName: string;
  middleName: string;
  lastName: string;
}

export const validateAndUpdateFormState = updateGroup<UserFormValue>({
  firstName: validate(required),
  lastName: validate(required)
});

export const FORM_INITIAL_STATE = createFormGroupState<UserFormValue>(
  userFormSlice,
  {
    firstName: '',
    middleName: '',
    lastName: ''
  }
);

export interface State {
  userForm: FormGroupState<UserFormValue>;
}

const initialState: State = {
  userForm: FORM_INITIAL_STATE
};

export const rawReducer = createReducer(initialState, onNgrxForms());

export const reducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  // point to the form state to update
  (s) => s.userForm,
  // this function is always called after the reducer
  validateAndUpdateFormState
);

export const getUserForm = (state: State) => state.userForm;
export const getFirstName = (state: State) => state.userForm.controls.firstName;
export const getMiddleName = (state: State) =>
  state.userForm.controls.middleName;
export const getLastName = (state: State) => state.userForm.controls.lastName;
