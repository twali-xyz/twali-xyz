/**
 * Retrieves price of a token or a set of tokens against a provided currency
 * 
 * Note: each tokenID must be separated with `%2C`, which is a comma. 
 * Please use encodeURIComponent() or encodeURI() to convert the commas into URI format for the URL
 * @string tokenIDs, eg: 'ethereum'
 * @string currency, eg: 'usd'
 */
export const TokenPriceList = (tokenIDs, currency) =>
  `https://api.coingecko.com/api/v3/simple/price?ids=${tokenIDs}&vs_currencies=${currency}&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`;

/* Retrieves all the data associated with a single token except price conversion */
export const SingleTokenData = (coinID) =>
  `https://api.coingecko.com/api/v3/coins/${coinID}`;