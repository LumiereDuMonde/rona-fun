import { createAction, props } from "@ngrx/store";
import { GIF } from "../models/GIF.model";

export const FAVORITE_ADD = createAction('[Favorite] Add One',props<{data: GIF}>());
export const FAVORITE_REMOVE = createAction('[Favorite] Remove One',props<{id: string}>());
