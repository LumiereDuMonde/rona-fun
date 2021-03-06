export const environment = {
  production: true,
  nationalAPIURL: 'assets/us.json',
  signInURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJqVnwW4N_lXqqpEEMTCXjvcXmzJTSNPE',
  API_KEY: 'AIzaSyBJqVnwW4N_lXqqpEEMTCXjvcXmzJTSNPE',
  GIPHY_API_KEY: '8fKQgxFhleNT0glKiICA1QzAgU77B94x',
  GIPHY_API_URL_TRENDING: 'https://api.giphy.com/v1/gifs/trending',
  GIPHY_API_URL_SEARCH: 'https://api.giphy.com/v1/gifs/search',
  GIPHY_API_URL_AUTOCOMPLETE: 'https://api.giphy.com/v1/gifs/search/tags',
  BITCOIN_WEBSOCKET_URL: 'wss://ws.kraken.com/',
  BITCOIN_CURRENCY_PAIRING: 'XBT/USD',
  BITCOIN_RECONNECT_INTERVAL: 5000,
  GOOGLE_MAP_KEY: "AIzaSyBdcFJr0vBJ9xhK_dHIlKv7VR37gIIDiyc"
};

export const stateAPIURL = (state) => `assets/${state}.json`;
export const GIPHY_API_URL = (gif_id) => `https://api.giphy.com/v1/gifs/${gif_id}`;
