// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  nationalAPIURL: 'https://api.covidtracking.com/v1/us/daily.json',  
  signInURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJqVnwW4N_lXqqpEEMTCXjvcXmzJTSNPE',
  API_KEY: 'AIzaSyBJqVnwW4N_lXqqpEEMTCXjvcXmzJTSNPE',
  GIPHY_API_KEY: '8fKQgxFhleNT0glKiICA1QzAgU77B94x',
  GIPHY_API_URL_TRENDING: 'https://api.giphy.com/v1/gifs/trending',
  GIPHY_API_URL_SEARCH: 'https://api.giphy.com/v1/gifs/search',
  GIPHY_API_URL_AUTOCOMPLETE: 'https://api.giphy.com/v1/gifs/search/tags'  
};

export const stateAPIURL = (state) => `https://api.covidtracking.com/v1/states/${state}/daily.json`;
export const GIPHY_API_URL = (gif_id) => `https://api.giphy.com/v1/gifs/${gif_id}`;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
