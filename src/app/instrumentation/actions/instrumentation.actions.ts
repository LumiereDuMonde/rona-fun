import { createAction, props } from "@ngrx/store";

export const INSTRUMENT_START = createAction(
    '[INSTRUMENTATION] Start'
);

export const INSTRUMENT_START_FINISHED = createAction(
    '[INSTRUMENTATION] Start Finished'
);

export const INSTRUMENT_STOP = createAction(
    '[INSTRUMENTATION] Stop'
);

export const INSTRUMENT_STOP_FINISHED = createAction(
    '[INSTRUMENTATION] Stop Finished'
);

export const INSTRUMENT_WIND_UPDATE = createAction(
    '[INSTRUMENTATION] Wind update', props<{ val: number }>()
);

export const INSTRUMENT_SPEED_UPDATE = createAction(
    '[INSTRUMENTATION] Speed update', props<{ val: number }>()
);

export const INSTRUMENT_FUEL_UPDATE = createAction(
    '[INSTRUMENTATION] Fuel update', props<{ val: number }>()
);

export const INSTRUMENT_TEMP_UPDATE = createAction(
    '[INSTRUMENTATION] Temperature update', props<{ val: number }>()
);

export const INSTRUMENT_RPM_UPDATE = createAction(
    '[INSTRUMENTATION] RPM update', props<{ val: number }>()
);