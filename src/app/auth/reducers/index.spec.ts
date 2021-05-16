import * as fromAuth from './';


const initialState = {
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
    auth: {
        authState: {
            user: null,
            loading: false,
            loggedIn: false,
            errorMsg: null,
            redirectUrl: '/trading'
        }
    },
    meme: {
        meme: {
            ids: [],
            entities: {},
            pagination: {
                offset: 0,
                total_count: 0,
                count: 0
            },
            search: '',
            loading: false,
            error: '',
            selectedId: null
        },
        favorites: {
            ids: [],
            entities: {}
        }
    },
    chart: {
        charting: {
            everLoaded: false,
            error: null,
            loading: false,
            covidData: [],
            selected: 'US',
            startDate: '01/01/2020',
            endDate: '03/08/2021',
            selectedType: 'Deaths'
        }
    },
    instrument: {
        instruments: {
            started: false,
            fuel: 0,
            speed: 0,
            wind: 0,
            temperature: 0,
            rpm: 0
        }
    }
}

describe('Auth Feature Selectors', () => {
    
    it('should select loading', () => {
        const result = fromAuth.selectAuthLoading.projector(initialState.auth.authState);
        expect(result).toBe(false);
    });

    it('should select error', () => {
        const result = fromAuth.selectAuthError.projector(initialState.auth.authState);
        expect(result).toBe(null);
    });

    it('should select loggedIn', () => {
        const result = fromAuth.selectAuthLoggedIn.projector(initialState.auth.authState);
        expect(result).toBe(false);
    });

    it('should select user', () => {
        const result = fromAuth.selectAuthUser.projector(initialState.auth.authState);
        expect(result).toBe(null);
    });

    it('should select redirectUrl', () => {
        const result = fromAuth.selectRedirectUrl.projector(initialState.auth.authState);
        expect(result).toBe('/trading');
    });    

});
