import { createAction, props } from "@ngrx/store";
import { ITrade } from "../models/trade.model";

export const TRADE_STARTING = createAction(
    '[Trading-Trade] Trading starting'
);

export const TRADE_STARTED = createAction(
    '[Trading-Trade] Trading started'
);

export const TRADE_PAYLOAD = createAction(
    '[Trading-Trade] Trade payload', props<{trades: ITrade[]}>()
);

export const TRADE_ENDING = createAction(
    '[Trading-Trade] Trading ending'
);

export const TRADE_ENDED = createAction(
    '[Trading-Trade] Trading ended'
);

export const TRADE_ERROR = createAction(
    '[Trading-Trade] Trading Error', props<{error: string}>()
);