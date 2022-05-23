export const TokenPriceList = (tokenIDList, currency) =>
  `https://api.coingecko.com/api/v3/simple/price?ids=${tokenIDList}&vs_currencies=${currency}&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`;

  export const SingleTokenData = (coinID) =>
  `https://api.coingecko.com/api/v3/coins/${coinID}`;