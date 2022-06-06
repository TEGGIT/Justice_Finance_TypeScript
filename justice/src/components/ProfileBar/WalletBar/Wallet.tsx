import React from 'react';
import classes from './Wallet.module.scss'
import {countryCount} from '../../../mockdata/countryCount'
import {countryIcon} from '../../../mockdata/countryIcon'


interface WalletType{
  onClick: () => void,
  pointer: any,
  countryName: String,
  country: any,
  countryCounter: any,
  count: any


}

const Wallet:React.FC<WalletType> = (props) => {
  const {
    onClick,
    pointer,
    countryName,
    country,
    countryCounter,
    count

  } = props

  // @ts-ignore
  return (
    <>
    </>
    // <div className={classes.wallet} onClick={onClick} style={pointer}>
    //   <div className={classes.wallet_top}>
    //     <p>{countryName}</p>
    //     <img src={countryIcon[`${country}`]} alt="Иконка страны"/>
    //   </div>
    //   <div className={classes.wallet_bottom}>
    //     <p>{count} {countryCount[`${countryCounter}`]}</p>
    //   </div>
    // </div>
  );
};

export default Wallet;