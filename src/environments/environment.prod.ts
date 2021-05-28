export const environment = {
  production: true,
  nationalAPIURL: 'assets/us.json', 
  signInURL: '',
  API_KEY: '',
  GIPHY_API_KEY: '8fKQgxFhleNT0glKiICA1QzAgU77B94x',
  GIPHY_API_URL_TRENDING: 'https://api.giphy.com/v1/gifs/trending',
  GIPHY_API_URL_SEARCH: 'https://api.giphy.com/v1/gifs/search',
  GIPHY_API_URL_AUTOCOMPLETE: 'https://api.giphy.com/v1/gifs/search/tags',
  BITCOIN_WEBSOCKET_URL: 'wss://ws.kraken.com/',
  BITCOIN_CURRENCY_PAIRING: 'XBT/USD',
  BITCOIN_RECONNECT_INTERVAL: 5000  
};

export const stateAPIURL = (state) => `assets/${state}.json`;
export const GIPHY_API_URL = (gif_id) => `https://api.giphy.com/v1/gifs/${gif_id}`;
