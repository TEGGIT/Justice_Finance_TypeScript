import {ExchangeAction, exchangeRates, ExchangeRatesTypes} from "../../types/exchangeRates";

const initialState: exchangeRates = [
    {
        currencyName: null,
        rubleRatio: null,
    }
]

export const exchangeRatesReducer = (state: exchangeRates = initialState, action: ExchangeAction) => {
    switch (action.type) {
        case ExchangeRatesTypes.EXCHANGE_RATES_SET:
            return [
                ...action.payload
            ]

        default: {
            return state
        }
    }
}