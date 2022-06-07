import React, { useState, useEffect } from "react";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

import NavBar from "../../NavBar/NavBar";
import ProfileBar from "../../ProfileBar/ProfileBar";
import ButtonMui from "../../MUI/Button/ButtonMui";
import Wallet from "../../ProfileBar/WalletBar/Wallet";
import Input from "../../UI/Input/Input";

// import Modal from 'react-modal';
import axios from "axios";
import Cookies from "js-cookie";

import classes from "./PurseInfo.module.scss";

import arrowBack from "../../../assets/image/Back.svg";
import banner from "../../../assets/image/Banner.png";
import close from "../../../assets/image/Close.svg";
import walletIcon from "../../../assets/image/WalletIcon.svg";
import { useTypedSelector } from "../../../hooks/useTypesSelector";
import { CurrencyType } from "../PursePage";
import { WalletsType } from "../../../store/reducers/WalletsReducer";

const PurseInfo = () => {
  const customStyles = {
    overlay: {
      backgroundcolor: "rgba(0, 0, 0, 0.8)",
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

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [sum, setSum] = useState("");
  const [id, setId] = useState("");
  const [numberCard, setNumberCard] = useState("");
  const [date, setDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [ownerCard, setOwnerCard] = useState("");

  const { wallets } = useTypedSelector((state) => state.wallets);

  const currentWallet: WalletsType | undefined = wallets.find(
    (wallet) => `#${wallet.currency}` === location.hash
  );

  const deleteWallet = () => {
    const newWallets =
      currentWallet &&
      wallets.filter((wallet) => wallet.currency !== currentWallet.currency);
    axios
      .patch(
        "http://localhost:5000/api/wallets/remove",
        {
          wallets: newWallets,
          id,
        },
        {
          headers: { Authorization: `${Cookies.get("TOKEN")}` },
        }
      )
      .then((res) => {});
    navigate("/purse-page", { replace: true });
  };

  const addSumWallet = () => {
    const newWalletStorage = wallets?.map((wallet) => {
      if (wallet.currency === currentWallet?.currency)
        wallet.sum = +currentWallet.sum + +sum;
      setSum("");
      setNumberCard("");
      setDate("");
      setCvc("");
      setOwnerCard("");
      return wallet;
    });

    axios
      .patch(
        "http://localhost:5000/api/wallets/update",
        {
          wallets: [...newWalletStorage],
        },
        {
          headers: { Authorization: `${Cookies.get("TOKEN")}` },
        }
      )
      .then((res) => {});
    setIsOpen(true);
  };

  useEffect(() => {
    if (!sum || !numberCard || !date || !cvc || !ownerCard) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [sum, isDisabled, numberCard, date, cvc, ownerCard]);
  return (
    <main className={classes.main}>
      <NavBar />
      <section className={classes.main_wrapper}>
        <div className={classes.main_wrapper__title}>
          <div className={classes.main_wrapper__title_purse_id}>
            <NavLink to="/purse-page">
              <img src={arrowBack} alt="Назад" />
            </NavLink>
            <h1 className={classes.main_wrapper__title_text}>
              {`${currentWallet?.currency}`}
            </h1>
            <span className={classes.main_wrapper__title_text_number}>
              {`#${currentWallet?.purseNumber}`}
            </span>
          </div>
          {/*<Modal style={customStyles}*/}
          {/*       isOpen={modalIsOpen}*/}
          {/*>*/}
          {/*  <img src={close} alt='закрыть' className={classes.img} onClick={() => setIsOpen(false)}/>*/}
          {/*  <div className={classes.modal_wrapper}>*/}
          {/*    <div className={classes.modal_wrapper__content}>*/}
          {/*      <img src={walletIcon} alt='Иконка кошелька'/>*/}
          {/*      <p className={classes.modal_wrapper__content_text_main}>*/}
          {/*        Пополнение прошло успешно*/}
          {/*      </p>*/}
          {/*      <p className={classes.modal_wrapper__content_text_bottom}>Вы успешно пополнили свой кошелек.</p>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</Modal>*/}
          <ButtonMui
            text="Удалить кошелёк"
            padding="12px"
            border="1px solid #363636"
            backgroundcolor="#FFFFFF"
            hoverbackground="#FFFFFF"
            fontcolor="#363636"
            fontSize="12px"
            fontWeight="600"
            onClick={deleteWallet}
          />
        </div>
        <div className={classes.main_wrapper__purse}>
          {currentWallet?.currency && (
            <Wallet
              countryName={currentWallet.currency}
              country={currentWallet?.currency}
              count={currentWallet?.sum.toFixed(2)}
              countryCounter={currentWallet?.currency}
            />
          )}
          <img src={banner} alt="баннер" />
        </div>
        <div className={classes.main_wrapper__replenishment}>
          <p className={classes.main_wrapper__replenishment_text}>Пополнение</p>
          <div className={classes.main_wrapper__replenishment_wrapper}>
            <Input
              placeholder="Сумма"
              type="number"
              className={classes.main_wrapper__replenishment_wrapper_input}
              value={sum}
              onChange={(e) => setSum(e.target.value)}
            />
            <Input
              placeholder="Номер карты"
              type="number"
              className={classes.main_wrapper__replenishment_wrapper_input}
              value={numberCard}
              onChange={(e) => setNumberCard(e.target.value)}
            />
            <Input
              placeholder="Даты"
              type="number"
              className={classes.main_wrapper__replenishment_wrapper_input}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <Input
              placeholder="CVC"
              type="number"
              className={classes.main_wrapper__replenishment_wrapper_input}
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
            />
            <Input
              placeholder="Владелец карты"
              type="text"
              className={classes.main_wrapper__replenishment_wrapper_input}
              value={ownerCard}
              onChange={(e) => setOwnerCard(e.target.value)}
            />
            <ButtonMui
              text="Пополнить кошелек"
              padding="15px 24px"
              backgroundcolor="#363636"
              disabled={isDisabled}
              hoverbackground="#363636"
              fontcolor="#FFFFFF"
              fontSize="16px"
              fontWeight="600"
              onClick={addSumWallet}
            />
          </div>
        </div>
      </section>
      <ProfileBar />
    </main>
  );
};

export default PurseInfo;
