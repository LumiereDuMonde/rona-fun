import { GIF } from './GIF.model';
import { GiphyMeta } from './Meta.model';
import { GiphyPagination } from './pagination.model';

export interface GiphyResult {
    data: GIF[],
    pagination: GiphyPagination,
    meta: GiphyMeta
}