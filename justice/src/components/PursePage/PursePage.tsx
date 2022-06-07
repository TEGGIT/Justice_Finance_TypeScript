import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

// import Modal from 'react-modal';
import axios from "axios";

import Input from "../UI/Input/Input";
import Select from "../MUI/Select/Select";
import ButtonMui from "../MUI/Button/ButtonMui";
import Wallet from "../ProfileBar/WalletBar/Wallet";
import NavBar from "../NavBar/NavBar";
import ProfileBar from "../ProfileBar/ProfileBar";

import classes from "./PursePage.module.scss";
import { countryIcon } from "../../mockdata/countryIcon";

import wallet from "../../assets/image/wallet.svg";
import close from "../../assets/image/Close.svg";
import { useTypedSelector } from "../../hooks/useTypesSelector";
import { FetchWallets } from "../../store/action-creators/wallets";
import { useActions } from "../../hooks/useAction";
import Cookies from "js-cookie";
import { SelectChangeEvent } from "@mui/material";

const customStyles = {
  overlay: {
    bc: "rgba(0, 0, 0, 0.8)",
    zIndex: "3",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    direction: "column",
    alignItems: "flex-end",
  },
};

export type CurrencyType = "USD" | "TRY" | "EUR" | "CNY" | "RUB" | "";

const PursePage = () => {
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const [modalErrorIsOpen, setModalErrorIsOpen] = React.useState(false);
  const [currency, setCurrency] = useState<CurrencyType>();
  const [numberPurse, setNumberPurse] = useState<number>();
  const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(true);
  const navigate = useNavigate();

  const { wallets } = useTypedSelector((state) => state.wallets) ?? {};
  const { FetchWallets } = useActions();

  useEffect(() => {
    if (!numberPurse || !currency) {
      setIsDisabledBtn(true);
    } else {
      setIsDisabledBtn(false);
    }
  }, [numberPurse, currency]);
  console.log(currency);

  const addPurse = () => {
    const isFindWallet = wallets?.find(
      (wallet) => wallet.currency === currency
    );
    if (isFindWallet) {
      setModalErrorIsOpen(true);
    } else {
      setIsOpen(true);

      axios
        .patch(
          "http://localhost:5000/api/wallets/create",
          {
            wallets: [
              ...wallets,
              {
                currency,
                purseNumber: numberPurse,
                sum: 0,
              },
            ],
          },
          {
            headers: {
              Authorization: `${Cookies.get("TOKEN")}`,
            },
          }
        )
        .then(() => {
          FetchWallets();
        });
    }
  };
  useEffect(() => {
    if (modalIsOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  }, [modalIsOpen]);

  useEffect(() => {
    if (modalErrorIsOpen) {
      setTimeout(() => {
        setModalErrorIsOpen(false);
      }, 3000);
    }
  });

  const handleChange = (event: SelectChangeEvent<CurrencyType>) => {
    setCurrency(event.target.value as CurrencyType);
  };

  const walletLink = (wallet: { currency: any }) => {
    navigate(`/purse-info-page/#${wallet.currency}`, { replace: true });
  };

  return (
    <main className={classes.main}>
      <NavBar />
      <section className={classes.main__wrapper}>
        <div className={classes.main__wrapper__title}>
          <h1 className={classes.main__wrapper__title_text}>Кошельки</h1>
        </div>

        {wallets.length > 0 ? (
          <div className={classes.main__wrapper__wallet_container__wallets}>
            {wallets.map((wallet, index) => (
              <Wallet
                pointer={{ cursor: "pointer" }}
                key={index}
                countryName={wallet.currency}
                country={wallet.currency}
                count={wallet.sum.toFixed(2)}
                countryCounter={wallet.currency}
                onClick={() => walletLink(wallet)}
              />
            ))}
          </div>
        ) : (
          <div className={classes.main__wrapper__wallet_container}>
            <img src={wallet} alt="Кошелек" />
            <p className={classes.main__wrapper__title_wallet}>
              На данный момент у вас не созданно ни одного кошелька
            </p>
          </div>
        )}

        <div className={classes.main__wrapper__wallet_container__add}>
          <div className={classes.main__wrapper__wallet_container__add_title}>
            <p>Добавление кошелька</p>
          </div>
          <div className={classes.main__wrapper__wallet_container__add__select}>
            <div className={classes.desktop_button}>
              <Select
                handleChangeSelect={handleChange}
                selectValue={currency}
                minWidth="388px"
                name="Выберите валюту"
                array={countryIcon}
              />
            </div>

            <div className={classes.mobile_button}>
              <Select
                handleChangeSelect={handleChange}
                selectValue={currency}
                minWidth="250px"
                name="Выберите валюту"
                array={countryIcon}
              />
            </div>
            <Input
              placeholder="# Номер кошелька"
              type="number"
              className={
                classes.main__wrapper__wallet_container__add__select_input
              }
              value={numberPurse}
              onChange={(e) => {
                setNumberPurse(e.target.valueAsNumber);
              }}
            />
            <ButtonMui
              text="Добавить кошелек"
              bc="#363636"
              padding="15px 24px"
              disabled={isDisabledBtn}
              coloring="#EEEEEE"
              fontSize="16px"
              fontWeight="600"
              hb="#363636"
              onClick={addPurse}
            />
          </div>
        </div>
      </section>
      <ProfileBar />
    </main>
  );
};
export default PursePage;
