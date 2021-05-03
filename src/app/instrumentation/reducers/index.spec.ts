import * as fromReducer from './index'
describe('Instrument Feature', () => {
    const state = {
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
        instrument: {
        instruments: {
          started: true,
          fuel: 1,
          speed: 2,
          wind: 3,
          temperature: 4,
          rpm: 5
        }
      }}

    it('selectInstrumentStarted should return started', () => {
        expect(fromReducer.selectInstrumentStarted(state)).toEqual(true);
    });

    it('selectInstrumentRPM should return correct value', () => {
        expect(fromReducer.selectInstrumentRPM(state)).toEqual(5);
    });

    it('selectInstrumentFuel should return correct value', () => {
        expect(fromReducer.selectInstrumentFuel(state)).toEqual(1);
    });

    it('selectInstrumentSpeed should return correct value', () => {
        expect(fromReducer.selectInstrumentSpeed(state)).toEqual(2);
    });

    it('selectInstrumentTemp should return correct value', () => {
        expect(fromReducer.selectInstrumentTemp(state)).toEqual(4);
    });   
    
    it('selectInstrumentWind should return correct value', () => {
        expect(fromReducer.selectInstrumentWind(state)).toEqual(3);
    });    
});