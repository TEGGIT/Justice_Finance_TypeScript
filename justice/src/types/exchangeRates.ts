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
    rubleRatio: string;
    currencyName: string;
  }
];

export type ExchangeAction = ExchangeRatesAction
