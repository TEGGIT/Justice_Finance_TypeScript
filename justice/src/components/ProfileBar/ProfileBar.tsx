import React, {useEffect, useState} from "react";

import {NavLink, useNavigate} from "react-router-dom";

import ButtonMui from "../MUI/Button/ButtonMui";
import Wallet from "./WalletBar/Wallet";

import {useTypedSelector} from "../../hooks/useTypesSelector";
import {useActions} from "../../hooks/useAction";

import classes from "./ProfileBar.module.scss";
import avatar from "../../assets/image/Avatar.svg";
import plus from "../../assets/image/Plus.svg";
import transactions from "../../assets/image/transaction.svg";
import greenEllipse from "../../assets/image/GreenElipse.svg";
import left from "../../assets/image/arrowProfileLeft.svg";
import right from "../../assets/image/arrowProfileRight.svg";

const ProfileBar = () => {
  const navigate = useNavigate();
  const {FetchUser, FetchWallets} = useActions();
  const {users, loading} = useTypedSelector((state) => state.user);
  const {wallets} = useTypedSelector((state) => state.wallets);

  const [x, setX] = useState<number>(0);
  const moveBlockLeft = () => {
    setX(x + 250);
    if (x === 0) setX(0);
  };
  const moveBlockRight = () => {
    setX(x - 250);
    if (x === -250 * (wallets.length - 1)) setX(0);
  };

  const walletLink = (wallet: { currency: string }) => {
    navigate(`/purse-info-page/#${wallet.currency}`, {replace: true});
  };

  useEffect(() => {
    FetchUser();
    FetchWallets();
  }, []);

  const transaction = users[0]?.transaction;

  return (
    <div className={classes.profile}>
      <div className={classes.profile_wrapper}>
        <div className={classes.profile_wrapper__avatar}>
          <img src={avatar} alt="аватар"/>
          <p className={classes.profile_wrapper__avatar_name}>
            {loading ? (
              <>
                <p style={{fontWeight: "600"}}>Загрузка...</p>
              </>
            ) : (
              <>{users[0]?.name}</>
            )}
          </p>
        </div>
        <div className={classes.profile_wrapper__balance}>
          <div className={classes.profile_wrapper__balance_arrows}>
            <p>Мой баланс</p>
            {wallets?.length > 1 && (
              <div className={classes.profile_wrapper__balance_arrows_arrow}>
                <img src={left} onClick={moveBlockLeft} alt="#"/>
                <img src={right} onClick={moveBlockRight} alt="#"/>
              </div>
            )}
          </div>

          {wallets?.length ? (
            <div className={classes.slider}>
              <div
                style={{
                  transform: `translateX(${x}px)`,
                  display: "flex",
                  transition: "0.5s",
                  gap: "10px",
                }}
              >
                {wallets?.map((wallet) => (
                  <Wallet
                    pointer={true}
                    key={wallet.currency}
                    countryName={wallet.currency}
                    country={wallet.currency}
                    count={wallet.sum.toFixed(2)}
                    countryCounter={wallet.currency}
                    onClick={() => walletLink(wallet)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className={classes.profile_wrapper__balance__purse}>
              <p>Добавьте кошелек</p>
              <NavLink to="/purse-page">
                <ButtonMui
                  icon={plus}
                  bc="#363636"
                  hb="#363636"
                  rounding="30px "
                  padding="12px"
                  height="60px"
                  coloring=""
                  fontSize=""
                  fontWeight=""
                  text=""
                />
              </NavLink>
            </div>
          )}
        </div>
        <div className={classes.profile_wrapper__transactions}>
          <p>Последние транзацкции </p>
          {transaction?.length < 1 ? (
            <div className={classes.profile_wrapper__transactions__history}>
              <img src={transactions} alt="Транзакции"/>
              <p>Вы не совершили не одной транзакции</p>
            </div>
          ) : (
            <div
              className={classes.profile_wrapper__transactions__history_actual}
            >
              {transaction
                ?.map((item, index) => (
                  <div
                    key={index}
                    className={
                      classes.profile_wrapper__transactions__history_actual_content
                    }
                  >
                    <p>{`-${item.giveValue}${item.give} / +${item.getValue} ${item.get}`}</p>

                    <img src={greenEllipse} alt="Успешно"/>
                  </div>
                ))
                .reverse()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
