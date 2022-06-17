import {ExchangeAction, ExchangeRatesTypes} from "../../types/exchangeRates";

const initialState = {
  exchangeRates: []
}

export const exchangeRatesReducer = (state = initialState, action: ExchangeAction) => {
  switch (action.type) {
    case ExchangeRatesTypes.EXCHANGE_RATES_SET:
      return {
        ...state,
        exchangeRates: action.payload
      }

    default: {
      return state
    }
  }
}