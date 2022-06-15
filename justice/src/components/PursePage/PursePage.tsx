import React, {useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";

import Input from "../UI/Input/Input";
import Select from "../MUI/Select/Select";
import ButtonMui from "../MUI/Button/ButtonMui";
import Wallet from "../ProfileBar/WalletBar/Wallet";
import NavBar from "../NavBar/NavBar";
import ProfileBar from "../ProfileBar/ProfileBar";
import Modal from "../UI/Modal/Modal";

import axios from "axios";
import Cookies from "js-cookie";

import {useTypedSelector} from "../../hooks/useTypesSelector";
import {useActions} from "../../hooks/useAction";

import {SelectChangeEvent} from "@mui/material";
import {CurrencyType} from "../../types/currency";

import {countryIcon} from "../../mockdata/countryIcon";

import classes from "./PursePage.module.scss";

import arrowRightSlide from '../../assets/image/ButtonRight.svg'
import arrowLeftSlide from '../../assets/image/LeftButtonSlide.svg'
import wallet from "../../assets/image/wallet.svg";
import WalletsIcon from "../../assets/image/WalletIcon.svg";

const PursePage = () => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalErrorIsOpen, setModalErrorIsOpen] = useState<boolean>(false);
  const [currency, setCurrency] = useState<CurrencyType>();
  const [numberPurse, setNumberPurse] = useState<number>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isDisabledSelect, setIsDisabledSelect] = useState<boolean>(false)
  const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(true);

  const [x, setX] = useState<number>(0);

  const [xMobile, setXMobile] = useState<number>(0)

  const moveBlockLeftMobile = () => {

    setXMobile(xMobile + 250);
    if (xMobile === 0) setXMobile(0);
  };
  const moveBlockRightMobile = () => {
    setXMobile(xMobile - 250);
    if (xMobile === -250 * (wallets.length - 1)) setXMobile(0);
  };


  const moveBlockLeft = () => {
    setX(x + 250);
    if (x === 0) setX(0);
  };
  const moveBlockRight = () => {
    setX(x - 250);
    if (x === -250 * (wallets.length - 3)) setX(0);
  };

  const navigate = useNavigate();

  const {wallets} = useTypedSelector((state) => state.wallets) ?? {};

  const {FetchWallets} = useActions();


  const newArrayCountry = countryIcon.filter(country => !wallets.find(wal => wal.currency === country?.currency))

  useEffect(() => {
    if (newArrayCountry.length === 0) {
      setIsDisabledSelect(true)
      setIsDisabledBtn(true)
    } else {
      setIsDisabledSelect(false)
    }
  }, [newArrayCountry])

  useEffect(() => {
    if (!numberPurse || !currency) {
      setIsDisabledBtn(true);
    } else {
      setIsDisabledBtn(false);
    }
  }, [numberPurse, currency]);
  const addPurse = () => {
    const isFindWallet = wallets?.find(
      (wallet) => wallet.currency === currency
    );
    if (isFindWallet) {
      setModalErrorIsOpen(true);
    } else {
      setOpenModal(true);

      axios.patch("http://localhost:5000/api/wallets/create", {
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
      setNumberPurse(0)
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

  const walletLink = (wallet: { currency: string }) => {
    navigate(`/purse-info-page/#${wallet.currency}`, {replace: true});
  };


  return (
    <main className={classes.main}>
      <NavBar/>
      <section className={classes.main__wrapper}>
        <div className={classes.main__wrapper__title}>
          <h1 className={classes.main__wrapper__title_text}>Кошельки</h1>
        </div>

        {wallets.length > 0 ? (
          <>
            <div className={classes.main__wrapper__wallet_container__wallets_desktop}>
              <div className={classes.slider}>
                <div style={{
                  transform: `translateX(${x}px)`,
                  display: "flex",
                  transition: "0.5s",
                  gap: "17px",
                }}>


                  {wallets.map((wallet, index) => (

                    <Wallet
                      pointer={true}
                      key={index}
                      countryName={wallet.currency}
                      country={wallet.currency}
                      count={wallet.sum.toFixed(2)}
                      countryCounter={wallet.currency}
                      onClick={() => walletLink(wallet)}
                    />

                  ))}
                </div>
              </div>
              {wallets.length > 3 && (
                <div className={classes.slider__button}>
                  <img src={arrowLeftSlide} onClick={moveBlockRight} alt=''/>
                  <img src={arrowRightSlide} onClick={moveBlockLeft} alt=''/>
                </div>
              )}
            </div>
            <div className={classes.main__wrapper__wallet_container__wallets_mobile}>
              <img src={arrowRightSlide} onClick={moveBlockLeftMobile} alt=''/>

              <div className={classes.slider_mobile}>
                <div style={{
                  transform: `translateX(${xMobile}px)`,
                  display: "flex",
                  transition: "0.5s",
                  gap: "12px",
                }}>


                  {wallets.map((wallet, index) => (

                    <Wallet
                      pointer={true}
                      key={index}
                      countryName={wallet.currency}
                      country={wallet.currency}
                      count={wallet.sum.toFixed(2)}
                      countryCounter={wallet.currency}
                      onClick={() => walletLink(wallet)}
                    />

                  ))}
                </div>
              </div>

              <img src={arrowLeftSlide} onClick={moveBlockRightMobile} alt=''/>

            </div>
          </>
        ) : (
          <div className={classes.main__wrapper__wallet_container}>
            <img src={wallet} alt="Кошелек"/>
            <p className={classes.main__wrapper__title_wallet}>
              На данный момент у вас не созданно ни одного кошелька
            </p>
          </div>
        )}


        <div className={classes.main__wrapper__wallet_container__add}>
          <div className={classes.main__wrapper__wallet_container__add_title}>
            <p className={classes.main__wrapper__wallet_container__add_title_text}>Добавление кошелька</p>
            {newArrayCountry.length === 0 && (
              <>
                <p className={classes.select_limit}>Достигнут лимит количества кошельков</p>
              </>
            )}
          </div>
          <div className={classes.main__wrapper__wallet_container__add__select}>

            <div className={classes.desktop_button}>
              <Select
                handleChangeSelect={handleChange}
                selectValue={currency}
                minWidth="388px"
                name="Выберите валюту"
                array={newArrayCountry}
                disabled={isDisabledSelect}
              />
            </div>
            <div className={classes.mobile_button}>
              <Select
                handleChangeSelect={handleChange}
                selectValue={currency}
                minWidth="250px"
                name="Выберите валюту"
                array={newArrayCountry}
                disabled={isDisabledSelect}

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
      <ProfileBar/>
      {openModal && openModal && (
        <Modal
          setOpenModal={setOpenModal}
          image={WalletsIcon}
          textMain="Кошелек успешно добавлен"
          textBottom="Теперь вы можете совершать любые операции."
        />
      )}
    </main>
  );
};
export default PursePage;
