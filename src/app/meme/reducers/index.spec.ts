import * as fromReducer from './index'

describe('Meme Feature Key', () => {
    const state = {
        UI: {
            sideNavToggle: false
        },
        router: {
            state: {
                root: {
                    params: {},
                    data: {},
                    url: [],
                    outlet: 'primary',
                    routeConfig: null,
                    queryParams: {},
                    fragment: null,
                    firstChild: {
                        params: {},
                        data: {},
                        url: [
                            {
                                path: 'charting',
                                parameters: {}
                            }
                        ],
                        outlet: 'primary',
                        routeConfig: {
                            path: 'charting'
                        },
                        queryParams: {},
                        fragment: null,
                        firstChild: {
                            params: {},
                            data: {},
                            url: [],
                            outlet: 'primary',
                            routeConfig: {
                                path: ''
                            },
                            queryParams: {},
                            fragment: null,
                            children: []
                        },
                        children: [
                            {
                                params: {},
                                data: {},
                                url: [],
                                outlet: 'primary',
                                routeConfig: {
                                    path: ''
                                },
                                queryParams: {},
                                fragment: null,
                                children: []
                            }
                        ]
                    },
                    children: [
                        {
                            params: {},
                            data: {},
                            url: [
                                {
                                    path: 'charting',
                                    parameters: {}
                                }
                            ],
                            outlet: 'primary',
                            routeConfig: {
                                path: 'charting'
                            },
                            queryParams: {},
                            fragment: null,
                            firstChild: {
                                params: {},
                                data: {},
                                url: [],
                                outlet: 'primary',
                                routeConfig: {
                                    path: ''
                                },
                                queryParams: {},
                                fragment: null,
                                children: []
                            },
                            children: [
                                {
                                    params: {},
                                    data: {},
                                    url: [],
                                    outlet: 'primary',
                                    routeConfig: {
                                        path: ''
                                    },
                                    queryParams: {},
                                    fragment: null,
                                    children: []
                                }
                            ]
                        }
                    ]
                },
                url: '/charting'
            },
            navigationId: 1
        },
        meme: {
            memes: {
                ids: ['1','2'],
                entities: {'1':{id: '1'} as any, '2': {id: '2'} as any},
                pagination: {
                    offset: 1,
                    total_count: 4,
                    count: 3
                },
                search: 'car',
                loading: true,
                error: 'error',
                selectedId: '2'
            },
            favorites: {
                ids: ['2'],
                entities: {'2': {id: '2'} as any}
            }
        }
    };

    it('selectMemeLoading should return true', () => {
        expect(fromReducer.selectMemeLoading(state)).toEqual(true);
    });

    it('selectMemeError should return error', () => {
        expect(fromReducer.selectMemeError(state)).toEqual('error');
    });

    it('selectMemeOffset should return 1', () => {
        expect(fromReducer.selectMemeOffset(state)).toEqual(1);
    });    

    it('selectMemeSearch should return search term', () => {
        expect(fromReducer.selectMemeSearch(state)).toEqual('car');
    });

    it('selectMemeSelectedId should return 2', () => {
        expect(fromReducer.selectMemeSelectedId(state)).toEqual('2');
    });

    it('selectMemeIds should return [1,2]', () => {
        expect(fromReducer.selectMemeIds(state)).toEqual(['1','2']);
    });    

    it('selectMemeEntities should return {\'1\':{id: \'1\'}, \'2\': {id: \'2\'}}', () => {
        expect(fromReducer.selectMemeEntities(state)).toEqual({'1':{id: '1'} as any, '2': {id: '2'} as any});
    });  

    it('selectAllMemes should return [{id: \'1\'}, {id: \'2\'}]', () => {
        expect(fromReducer.selectAllMemes(state)).toEqual([{id: '1'} as any, {id: '2'} as any]);
    });
    
    it('selectMemeTotal should return 2', () => {
        expect(fromReducer.selectMemeTotal(state)).toEqual(2);
    });

    it('selectCurrentMeme should return {id: \'2\'}', () => {
        expect(fromReducer.selectCurrentMeme(state)).toEqual({id: '2'} as any);
    });

    it('selectMemeAndTotalSearch should return {term:\'car\',total: \'2\'}', () => {
        expect(fromReducer.selectMemeAndTotalSearch(state)).toEqual({term: 'car', total: 2} as any);
    });

    it('selectFavoritesIds should return [\'2\']', () => {
        expect(fromReducer.selectFavoritesIds(state)).toEqual(['2']);
    });
    
    it('selectFavoritesEntities should return {2: {id: \'2\'}}', () => {
        expect(fromReducer.selectFavoritesEntities(state)).toEqual({'2': {id: '2'}} as any);
    });

    it('selectAllFavorites should return {id: \'2\'}', () => {
        expect(fromReducer.selectAllFavorites(state)).toEqual( [{id: '2'} as any]);
    });

    it('selectFavoritesTotal should return 1', () => {
        expect(fromReducer.selectFavoritesTotal(state)).toEqual(1);
    });

    it('selectMemesWithFavorites should return [{id: \'1\', is_favorite: false}, {id: \'2\', is_favorite: true}]', () => {
        expect(fromReducer.selectMemesWithFavorites(state)).toEqual([{id: '1', is_favorite: false} as any, {id: '2', is_favorite: true} as any]);
    });    

    it('selectFavoritesIdsAsStringArray should return [\'2\']', () => {
        expect(fromReducer.selectFavoritesIdsAsStringArray(state)).toEqual(['2']);
    });        
});
