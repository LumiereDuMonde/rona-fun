import { createAction, props } from "@ngrx/store";
import { BookLevel } from "../models/book.model";


export const BOOK_STARTING = createAction(
    '[Trading-Book] Book starting'
);

export const BOOK_STARTED = createAction(
    '[Trading-Book] Book started'
);

export const BOOK_PAYLOAD_SNAPSHOT = createAction(
    '[Trading-Book] Book snapshot', props<{book: BookLevel}>()
);

export const BOOK_PAYLOAD_UPDATE = createAction(
    '[Trading-Book] Book update', props<{book: BookLevel}>()
);

export const BOOK_ENDING = createAction(
    '[Trading-Book] Book ending'
);

export const BOOK_ENDED = createAction(
    '[Trading-Book] Book ended'
);

export const BOOK_ERROR = createAction(
    '[Trading-Book] Book Error', props<{error: string}>()
);