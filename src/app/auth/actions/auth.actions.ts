import { createAction, props } from '@ngrx/store';

import { LoginResult } from '../models/loginResult.model'
import { LoginUser } from '../models/loginUser.model';
import { User } from 'src/app/models/user.model';

const namespace = '[Auth] '

export const SIGNUP_START = createAction(
    namespace + 'Signup Start',
    props<{signup: LoginUser}>()
);

export const LOGIN_START = createAction(
    namespace + 'Login Start',
    props<{signup: LoginUser}>()
);

export const LOGIN_RESPONSE = createAction(
    namespace + 'Login Response',
    props<{user: LoginResult}>()
);

export const LOGIN_SUCCESS = createAction(
    namespace + 'Login Success',
    props<{user: User}>()
);

export const AUTOLOGIN_START = createAction(
    namespace + 'Auto Login Start'
);

export const AUTOLOGIN_SUCCESS = createAction(
    namespace + 'Auto Login Success',
    props<{user: User}>()
);

export const LOGIN_FAILURE = createAction(
    namespace + 'Login Failure',
    props<{error: string}>()
);

export const LOGOUT = createAction(
    namespace + 'Logout'    
);

export const NOT_LOGGED_IN = createAction(namespace + 'Not Logged In', props<{url: string}>());