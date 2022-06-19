import {exchangeRates, ExchangeRatesTypes} from "../../types/exchangeRates";

export const FetchExchangeRates = () => {
  return {
    type: ExchangeRatesTypes.EXCHANGE_RATES_GET,
  }
};

export const SetExchangeRates = (payload: exchangeRates[]) => {
  return {
    type: ExchangeRatesTypes.EXCHANGE_RATES_SET,
    payload
  }
};