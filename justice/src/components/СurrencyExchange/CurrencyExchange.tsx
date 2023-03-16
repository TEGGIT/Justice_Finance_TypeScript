import React, {useEffect, useState} from 'react';
import {CurrencyType} from "../../types/currency";
import {useActions} from "../../hooks/useAction";
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {TransactionType} from "../../types/transaction";
import {exchangeRates} from "../../types/exchangeRates";

export const CurrencyExchange = () => {

  const [give, setGive] = useState<CurrencyType>();
  const [get, setGet] = useState<CurrencyType>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [giveValue, setGiveValue] = useState<number>();
  const [getValue, setGetValue] = useState<number>();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isDisabledSelect, setIsDisabledSelect] = useState<boolean>(true)
  const {FetchExchangeRates} = useActions();
  const exchangeRates: exchangeRates = useTypedSelector((state) => state.exchangeRates);
  const {users} = useTypedSelector((state) => state.user);
  const {wallets} = useTypedSelector((state) => state.wallets);
  const {FetchWallets, FetchUser, transactionUser, updateWalletUser} = useActions();
  const Data = new Date();
  const Hour = Data.getHours();
  const Minutes = Data.getMinutes();

  const giveWallets = wallets.filter(wallet => wallet.currency !== get)

  const getWallets = wallets.filter(wallet => wallet.currency !== give)

  useEffect(() => {
    giveWallets.length && getWallets.length ? setIsDisabledSelect(false) : setIsDisabledSelect(true)

  }, [])

  useEffect(() => {
    if (get === give && get?.length && give?.length) {
    } else {
    }
  }, [get, give]);
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
          sum: item.sum + +Number(getValue),
        };
      }
      return item;
    });

    setOpenModal(true);
    setIsDisabled(true);
    updateWalletUser([...refreshWalletSum])
    setTimeout(() => {
      FetchWallets()
    }, 100)

    const newTransaction: TransactionType[] = [
      ...users[0].transaction,
      {
        get,
        Hour,
        Minutes,
        give,
        giveValue,
        getValue,
      },
    ]
    transactionUser(newTransaction)
    setTimeout(() => {
      FetchUser()
    }, 100)
    setGiveValue(0);
  };

  useEffect(() => {
    FetchExchangeRates()
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

    exchangeRates.map((input: { currencyName: CurrencyType; rubleRatio: string | null; }) => {
      walletGive.length &&
      walletGive[0].currency === input.currencyName &&
      exchangeRates?.map((output: { currencyName: CurrencyType; rubleRatio: string | null; }) => {
        get === output.currencyName &&
        setGetValue(
          Number(
            (
              (Number(input.rubleRatio) * Number(giveValue)) /
              Number(output.rubleRatio)
            ).toFixed(2)
          )
        );
      });
    });
  }, [giveValue, getValue, get, give, isDisabled]);
  return {
    setGiveValue,
    giveValue,
    wallets,
    setGive,
    give,
    giveWallets,
    isDisabledSelect,
    setGetValue,
    getValue,
    get,
    setGet,
    getWallets,
    isDisabled,
    addTransaction,
    openModal,
    setOpenModal,
  }
};