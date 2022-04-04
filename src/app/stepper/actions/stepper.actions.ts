import { createAction, props } from '@ngrx/store';

import { SignupFormValue } from '../reducers/signup.reducer';

export const SUBMIT_FORM_VALUE = createAction(
    '[Stepper] set submitted form value',
    props<{submittedForm: SignupFormValue}>()
);

