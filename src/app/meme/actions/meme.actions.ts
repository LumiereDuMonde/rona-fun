import { createAction, props } from "@ngrx/store";
import { GIF } from "../models/GIF.model";
import { GiphyPagination } from "../models/pagination.model";

export const MEME_TRENDING_START = createAction('[MEME] Get Trending');
export const MEME_TRENDING_FINISH = createAction('[MEME] Trending Finished',props<{data: GIF[], pagination: GiphyPagination}>());
export const MEME_TRENDING_ERROR = createAction('[MEME] Trending Error',props<{msg: string}>());
export const MEME_SET_ID = createAction('[MEME] Set Meme Id',props<{id: string}>());
export const MEME_SEARCH_START = createAction('[MEME] Get Search');
export const MEME_CLEAR_ITEMS = createAction('[MEME] Clear Items');
export const MEME_SET_SEARCH = createAction('[MEME] SET Search',props<{search: string}>());
export const MEME_CLEAR_ITEMS_THEN_SEARCH = createAction('[MEME] Clear Items Then Search',props<{search: string}>());
export const MEME_SEARCH_FINISH = createAction('[MEME] Search Finish',props<{data: GIF[], pagination: GiphyPagination}>());
export const MEME_SEARCH_ERROR = createAction('[MEME] Search Error',props<{msg: string}>());