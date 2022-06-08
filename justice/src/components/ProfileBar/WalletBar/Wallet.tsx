import React from "react";

import {CurrencyType} from "../../../types/currency"

import {countryCount} from "../../../mockdata/countryCount";
import {countryIconWallet} from "../../../mockdata/countryIconWallet";

import classes from "./Wallet.module.scss";

interface WalletType {
  onClick?: () => void;
  pointer?: boolean;
  countryName: CurrencyType;
  country: CurrencyType;
  countryCounter: CurrencyType;
  count: string;
}

const Wallet: React.FC<WalletType> = (props) => {
  const {
    onClick,
    pointer = false,
    countryName,
    country,
    countryCounter,
    count
  } = props;

  return (
    <div className={classes.wallet} onClick={onClick}>
      <div className={classes.wallet_top}>
        <p>{`${countryName}`}</p>
        <img src={countryIconWallet[`${country}`]} alt="Иконка страны"/>
      </div>
      <div className={classes.wallet_bottom}>
        <p>
          {count} {countryCount[`${countryCounter}`]}
        </p>
      </div>
    </div>
  );
};

export default Wallet;
