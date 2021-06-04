import { createAction, props } from '@ngrx/store';

export const CHANGE_LOCATION = createAction(
    '[Mapping] Location change',
    props<{loc: google.maps.LatLngBoundsLiteral, address: string}>()
);

// export const action2Success = createAction(
//     '[Mapping] action2Description Success',
//     props<{payload2Type}>()
// );

// export const action3Failure = createAction(
//     '[Mapping] action3Description Failure',
//     props<{payload3Type}>()
// );
