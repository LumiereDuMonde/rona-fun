export const environment = {
  production: true,
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