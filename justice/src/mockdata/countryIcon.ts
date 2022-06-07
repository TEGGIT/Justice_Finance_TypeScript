import RUB from '../../src/assets/icon/RUB.svg'
import USD from '../../src/assets/icon/USD.svg'
import CHY from '../../src/assets/icon/CNY.svg'
import EUR from '../../src/assets/icon/EUR.svg'
import TRY from '../../src/assets/icon/TRY.svg'
import {CurrencyType} from "../components/PursePage/PursePage";

type CountryIcon = {
  currency: CurrencyType,
  icon: string
}

export const countryIcon: CountryIcon[] = [
  {
    icon: RUB,
    currency: 'RUB',
  },
  {
    icon: CHY,
    currency: 'CNY',
  },
  {
    icon: EUR,
    currency: 'EUR',
  },
  {
    icon: TRY,
    currency: 'TRY',
  },

  {
    icon: USD,
    currency: 'USD',
  }
]