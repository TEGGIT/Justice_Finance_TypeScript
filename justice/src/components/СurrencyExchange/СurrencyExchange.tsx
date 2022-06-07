import React, {useEffect, useState} from "react";

import axios from "axios";

import NavBar from "../NavBar/NavBar";
import ProfileBar from "../ProfileBar/ProfileBar";
import Input from "../UI/Input/Input";
import Select from "../MUI/Select/Select";
import ButtonMui from "../MUI/Button/ButtonMui";

import classes from "./СurrencyExchange.module.scss";

import exchange from "../../assets/image/exchange.svg";
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {useActions} from "../../hooks/useAction";
import Cookies from "js-cookie";

const CurrencyExchange = () => {
  const [give, setGive] = React.useState("");
  const [get, setGet] = React.useState("");
  const [giveValue, setGiveValue]: any = useState("");
  const [getValue, setGetValue] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledError, setIsDisabledError] = useState(false)
  const [exchangeRates, setExchangeRates]: any[] = useState([]);

  const {users} = useTypedSelector(state => state.user)
  const {wallets} = useTypedSelector(state => state.wallets)
  const {FetchWallets, FetchUser} = useActions()

  const Data = new Date();
  const Hour = Data.getHours();
  const Minutes = Data.getMinutes();


  useEffect(() => {
    if (get === give && get.length && give.length) {
      setIsDisabledError(true)
    } else {
      setIsDisabledError(false)
    }
  }, [get, give, isDisabledError])

  const addTransaction = () => {
    const refreshWalletSum = wallets?.map(item => {
      if (item.currency === give) {
        return {
          ...item,
          sum: item.sum - giveValue
        }
      }
      if (item.currency === get) {
        return {
          ...item,
          sum: item.sum + +getValue
        }
      }
      return item
    })

    setIsDisabled(true)

    axios.patch('http://localhost:5000/api/wallets/update', {
      wallets: [
        ...refreshWalletSum
      ]
    }, {
      headers: {Authorization: `${Cookies.get("TOKEN")}`}
    },).then(() => {
      FetchWallets()
    })

    axios.patch('http://localhost:5000/api/transaction', {
      transaction: [
        ...users[0].transaction,
        {
          get,
          Hour,
          Minutes,
          give,
          giveValue,
          getValue
        }
      ]
    }, {headers: {Authorization: `${Cookies.get("TOKEN")}`}},).then((res) => {
      FetchUser()
    })
    setGiveValue('')
  };


  useEffect(() => {
    axios.get('http://localhost:5000/api/exchangeRates').then((responce) => {

      setExchangeRates(responce.data[0].exchangeRates)

    })
  }, [])

  useEffect(() => {
    const walletGive = wallets?.filter(wallet => wallet.currency === give && wallet)
    walletGive.length && (giveValue > walletGive[0].sum
    ||
    Boolean(!get)
    ||
    Boolean(!give)
    ||
    Boolean(!giveValue)
      ?
      setIsDisabled(true) : setIsDisabled(false))
    exchangeRates?.map((input: any) => {
      walletGive.length
      &&
      walletGive[0].currency === input.currencyName
      &&
      exchangeRates?.map((output: any) => {
        get === output.currencyName
        &&
        setGetValue(((input.rubleRatio * giveValue) / output.rubleRatio).toFixed(2))
      })
    })

  }, [giveValue, getValue, get, give, isDisabled])

  return (
    <main className={classes.main}>
      <NavBar/>
      <section className={classes.main__wrapper}>
        <div className={classes.main__wrapper__title}>
          <h1 className={classes.main__wrapper__title_text}>Обмен валют</h1>
        </div>
        <div className={classes.main__wrapper__content}>
          <div className={classes.main__wrapper__content__title__info}>
            <p>Укажите кошелек, сумму и валюту для обмена</p>
          </div>
          <div className={classes.main__wrapper__content__exchange}>
            <Input
              placeholder="Отдаю"
              type="number"
              className={classes.main__wrapper__content__exchange__input}
              onChange={(e) => setGiveValue(e.target.value)}
              value={giveValue}
            />
            {wallets ? (
              <Select
                handleChangeSelect={(e: any) => setGive(e.target.value)}
                selectValue={give}
                minWidth="21rem"
                name="Выберите кошелек"
                array={wallets}
              />
            ) : (
              <h1>LoAdInG...</h1>
            )}
          </div>
          <div className={classes.main__wrapper__content__exchange}>
            <Input
              placeholder="Получаю"
              type="number"
              className={classes.main__wrapper__content__exchange__input}
              onChange={(e) => setGetValue(e.target.value)}
              value={getValue}
              readOnly={true}
            />
            {wallets ? (
              <Select
                handleChangeSelect={(e: any) => setGet(e.target.value)}
                selectValue={get}
                minWidth="21rem"
                name="Выберите кошелек"
                array={wallets}
              />
            ) : (
              <h1>LoAdInG...</h1>
            )}
          </div>
          <div className={classes.main__wrapper__content__exchange}>
            {!isDisabledError ? (
              <>
                <ButtonMui
                  text="Обменять"
                  img={exchange}
                  backgroundcolor="#363636"
                  padding="16px"
                  gap="8px"
                  fontcolor="#FFFFFF"
                  fontWeight="600"
                  fontSize="16px"
                  hoverbackground="#363636"
                  disabled={isDisabled}
                  flexdirection="row-reverse"
                  onClick={addTransaction}
                />
              </>
            ) : (
              <>
                <div className={classes.button_error}>
                  <ButtonMui
                    text="Обменять"
                    img={exchange}
                    backgroundcolor="#A52800"
                    padding="16px"
                    gap="8px"
                    fontcolor="#FFFFFF"
                    fontWeight="600"
                    fontSize="16px"
                    hoverbackground="#A52800"
                    flexdirection="row-reverse"
                    onClick={() => {
                    }}
                  />
                  <p style={{color: 'red'}}>Вы не можете обменять одинаковую валюту</p>
                </div>
              </>
            )}


          </div>
        </div>
      </section>
      <ProfileBar/>
    </main>
  );
};

export default CurrencyExchange;
