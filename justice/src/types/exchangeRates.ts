import {CurrencyType} from "./currency";

export enum ExchangeRatesTypes {
  EXCHANGE_RATES_GET = "EXCHANGE_RATES_GET",
  EXCHANGE_RATES_SET = 'EXCHANGE_RATES_SET'
}

interface ExchangeRatesAction {
  type: ExchangeRatesTypes;
  payload: exchangeRates
}

export type exchangeRates = [
  {
    rubleRatio: string | null;
    currencyName: CurrencyType;
  }
];

export type ExchangeAction = ExchangeRatesAction
