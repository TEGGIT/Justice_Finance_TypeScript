import React, {useEffect, useState} from "react";

import axios from "axios";
import Cookies from "js-cookie";

import Modal from "../UI/Modal/Modal";
import NavBar from "../NavBar/NavBar";
import ProfileBar from "../ProfileBar/ProfileBar";
import Input from "../UI/Input/Input";
import Select from "../MUI/Select/Select";
import ButtonMui from "../MUI/Button/ButtonMui";

import {useActions} from "../../hooks/useAction";
import {useTypedSelector} from "../../hooks/useTypesSelector";

import {exchangeRates} from "../../types/exchangeRates";
import {CurrencyType} from "../PursePage/PursePage";

import classes from "./СurrencyExchange.module.scss";

import exchange from "../../assets/image/exchange.svg";
import exchangeRatesIcon from '../../assets/image/ExchangeIcon.svg'

const CurrencyExchange = () => {
  const [give, setGive] = useState<CurrencyType>();
  const [get, setGet] = useState<CurrencyType>();
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [giveValue, setGiveValue] = useState<string>('');
  const [getValue, setGetValue] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isDisabledError, setIsDisabledError] = useState<boolean>(false);
  const [exchangeRates, setExchangeRates] = useState<exchangeRates>();

  const {users} = useTypedSelector((state) => state.user);
  const {wallets} = useTypedSelector((state) => state.wallets);
  const {FetchWallets, FetchUser} = useActions();
  const Data = new Date();
  const Hour = Data.getHours();
  const Minutes = Data.getMinutes();

  useEffect(() => {
    if (get === give && get?.length && give?.length) {
      setIsDisabledError(true);
    } else {
      setIsDisabledError(false);
    }
  }, [get, give, isDisabledError]);

  const addTransaction = () => {
    const refreshWalletSum = wallets.map((item) => {
      if (item.currency === give) {
        return {
          ...item,
          sum: item.sum - Number(giveValue),
        };
      }
      if (item.currency === get) {
        return {
          ...item,
          sum: item.sum + +getValue,
        };
      }
      return item;
    });
    setOpenModal(true)

    setIsDisabled(true);

    axios
      .patch(
        "http://localhost:5000/api/wallets/update",
        {
          wallets: [...refreshWalletSum],
        },
        {
          headers: {Authorization: `${Cookies.get("TOKEN")}`},
        }
      )
      .then(() => {
        FetchWallets();
      });

    axios
      .patch(
        "http://localhost:5000/api/transaction",
        {
          transaction: [
            ...users[0].transaction,
            {
              get,
              Hour,
              Minutes,
              give,
              giveValue,
              getValue,
            },
          ],
        },
        {headers: {Authorization: `${Cookies.get("TOKEN")}`}}
      )
      .then(() => {
        FetchUser();
      });
    setGiveValue("");
  };

  useEffect(() => {
    axios.get("http://localhost:5000/api/exchangeRates").then((res) => {
      setExchangeRates(res.data[0].exchangeRates);
    });
  }, []);

  useEffect(() => {
    const walletGive = wallets?.filter(
      (wallet) => wallet.currency === give && wallet
    );
    walletGive.length &&
    (Number(giveValue) > walletGive[0].sum ||
    Boolean(!get) ||
    Boolean(!give) ||
    Boolean(!giveValue)
      ? setIsDisabled(true)
      : setIsDisabled(false));
    exchangeRates?.map((input) => {
      walletGive.length &&
      walletGive[0].currency === input.currencyName &&
      exchangeRates?.map((output) => {
        get === output.currencyName &&
        setGetValue(
          ((Number(input.rubleRatio) * Number(giveValue)) / Number(output.rubleRatio)).toFixed(2)
        );
      });
    });
  }, [giveValue, getValue, get, give, isDisabled]);

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
                handleChangeSelect={(event) => setGive(event.target.value as CurrencyType)}
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
                handleChangeSelect={(event) => setGet(event.target.value as CurrencyType)}
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
                  icon={exchange}
                  bc="#363636"
                  padding="16px"
                  gap="8px"
                  coloring="#FFFFFF"
                  fontWeight="600"
                  fontSize="16px"
                  hb="#363636"
                  disabled={isDisabled}
                  direction="row-reverse"
                  onClick={addTransaction}
                />
              </>
            ) : (
              <>
                <div className={classes.button_error}>
                  <ButtonMui
                    text="Обменять"
                    icon={exchange}
                    bc="#A52800"
                    padding="16px"
                    gap="8px"
                    coloring="#FFFFFF"
                    fontWeight="600"
                    fontSize="16px"
                    hb="#A52800"
                    direction="row-reverse"
                    onClick={() => {
                    }}
                  />
                  <p style={{color: "red"}}>Вы не можете обменять одинаковую валюту</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <ProfileBar/>
      {openModal && openModal &&
        <Modal setOpenModal={setOpenModal}
               image={exchangeRatesIcon}
               textMain="Успешно"
               textBottom="Ву успешно обменяли валюту по актуальному курсу"
        />}
    </main>
  );
};

export default CurrencyExchange;
