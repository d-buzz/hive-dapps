import axios from "axios";
import _g = require("../_g");
const httpClient = axios.create();
httpClient.defaults.timeout = 5000;

export const update_hbd_and_hive_price = async () => {
  try {
    let objects: any = await Promise.all([bittrex_price()]);

    let prices = { BTC_USD: [], BTC_HIVE: [], BTC_HBD: [] };
    for (let o of objects) {
      for (let key in o) {
        if (o[key] && o[key] > 0 && !isNaN(o[key])) {
          prices[key].push(o[key]);
        }
      }
    }

    let sum_prices = { BTC_USD: 0, BTC_HIVE: 0, BTC_HBD: 0 };
    for (let key in prices) {
      sum_prices[key] =
        prices[key].reduce((x, y) => x + y, 0) / prices[key].length;
    }

    const hbd_dollar_price = sum_prices.BTC_HBD * sum_prices.BTC_USD;
    const hive_dollar_price = sum_prices.BTC_HIVE * sum_prices.BTC_USD;
    const hbd_hive_ratio = hbd_dollar_price / hive_dollar_price;

    if (hbd_dollar_price && hive_dollar_price && hbd_hive_ratio) {
      _g.hbd_dollar_price = hbd_dollar_price;
      _g.hive_dollar_price = hive_dollar_price;
      _g.hbd_hive_ratio = hbd_hive_ratio;
      //_g.internal_hive_price = _g.hive_dollar_price
    } else {
      console.log(`Updating price from exchanges but data were invalid`, {
        prices,
      });
    }
  } catch (error) {
    console.error("update_hbd_and_hive_price", "exchanges", error);
  }
};

export const bittrex_price = async () => {
  try {
    let BTC_USD = (
      await httpClient.get(
        "https://bittrex.com/api/v1.1/public/getticker?market=USDT-BTC"
      )
    ).data.result;
    let BTC_HIVE = (
      await httpClient.get(
        "https://bittrex.com/api/v1.1/public/getticker?market=BTC-HIVE"
      )
    ).data.result;
    let BTC_HBD = (
      await axios.get(
        `https://bittrex.com/api/v1.1/public/getticker?market=BTC-HBD`
      )
    ).data.result;

    BTC_USD = JSON.parse(JSON.stringify(BTC_USD)).Last;
    BTC_HIVE = JSON.parse(JSON.stringify(BTC_HIVE)).Last;
    BTC_HBD = JSON.parse(JSON.stringify(BTC_HBD)).Last;

    console.log(BTC_USD, BTC_HIVE, BTC_HBD);

    return { BTC_USD, BTC_HIVE, BTC_HBD };
  } catch (error) {
    console.error(`bittrex_price`, error);
    return 0;
  }
};

export const upbit_price = async () => {
  try {
    let BTC_USD = (
      await httpClient.get(
        "https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.USDT-BTC"
      )
    ).data[0];
    let BTC_HIVE = (
      await httpClient.get(
        "https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.BTC-HIVE"
      )
    ).data[0];
    let BTC_HBD = (
      await httpClient.get(
        "https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.BTC-HBD"
      )
    ).data[0];

    BTC_USD = JSON.parse(JSON.stringify(BTC_USD)).tradePrice;
    BTC_HIVE = JSON.parse(JSON.stringify(BTC_HIVE)).tradePrice;
    BTC_HBD = JSON.parse(JSON.stringify(BTC_HBD)).tradePrice;

    return { BTC_USD, BTC_HIVE, BTC_HBD };
  } catch (error) {
    console.error(`upbit_price`, error.message);
    return 0;
  }
};
