import React from "react";
import classes from "./Wallet.module.scss";
import { countryCount } from "../../../mockdata/countryCount";
import { countryIconWallet } from "../../../mockdata/countryIconWallet";
import { CurrencyType } from "../../PursePage/PursePage";

interface WalletType {
  onClick?: () => void;
  pointer?: any;
  countryName: CurrencyType;
  country: any;
  countryCounter: any;
  count: any;
}

const Wallet: React.FC<WalletType> = (props) => {
  const { onClick, pointer, countryName, country, countryCounter, count } =
    props;

  return (
    <div className={classes.wallet} onClick={onClick} style={pointer}>
      <div className={classes.wallet_top}>
        <p>{`${countryName}`}</p>
        <img src={countryIconWallet[`${country}`]} alt="Иконка страны" />
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
