import React from "react";

import Modal from "../UI/Modal/Modal";
import NavBar from "../NavBar/NavBar";
import ProfileBar from "../ProfileBar/ProfileBar";
import Input from "../UI/Input/Input";
import Select from "../MUI/Select/Select";
import ButtonMui from "../MUI/Button/ButtonMui";

import {CurrencyExchange} from "./CurrencyExchange";

import {CurrencyType} from "../../types/currency";

import classes from "./СurrencyExchange.module.scss";

import exchange from "../../assets/image/exchange.svg";
import exchangeRatesIcon from "../../assets/image/ExchangeIcon.svg";

const CurrencyExchangeComponent = () => {

  const {
    setGet,
    setGetValue,
    setGiveValue,
    setGive,
    setOpenModal,
    giveWallets,
    getWallets,
    wallets,
    isDisabledSelect,
    isDisabled,
    addTransaction,
    giveValue,
    give,
    openModal,
    get,
    getValue,
  } = CurrencyExchange()

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
              onChange={(e) => setGiveValue(e.target.valueAsNumber)}
              value={giveValue}
            />
            {wallets ? (
              <Select
                handleChangeSelect={(event) => setGive(event.target.value as CurrencyType)}
                selectValue={give}
                minWidth="21rem"
                name="Выберите кошелек"
                array={giveWallets}
                disabled={isDisabledSelect}
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
              onChange={(e) => setGetValue(e.target.valueAsNumber)}
              value={getValue}
              readOnly={true}
            />
            {wallets ? (
              <Select
                handleChangeSelect={(event) =>
                  setGet(event.target.value as CurrencyType)
                }
                selectValue={get}
                minWidth="21rem"
                name="Выберите кошелек"
                array={getWallets}
                disabled={isDisabledSelect}

              />
            ) : (
              <h1>LoAdInG...</h1>
            )}
          </div>
          <div className={classes.main__wrapper__content__exchange}>

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

          </div>
        </div>
      </section>
      <ProfileBar/>
      {openModal && openModal && (
        <Modal
          setOpenModal={setOpenModal}
          image={exchangeRatesIcon}
          textMain="Успешно"
          textBottom="Вы успешно обменяли валюту по актуальному курсу"
        />
      )}
    </main>
  );
};

export default CurrencyExchangeComponent;
