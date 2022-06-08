import React, {useState, useEffect} from "react";

import {NavLink} from "react-router-dom";

import axios from "axios";

import Charts from "./Chart/Chart";
import SliderRate from "./SliderRate/SliderRate";
import ButtonMui from "../MUI/Button/ButtonMui";
import NavBar from "../NavBar/NavBar";
import Input from "../UI/Input/Input";
import ProfileBar from "../ProfileBar/ProfileBar";

import {exchangeRates} from "../../types/exchangeRates";
// import SlideButton from "../UI/SlideButton/SlideButton";
import classes from "./ExchangeRatesPage.module.scss";
// import arrowButtonLeft from "../../assets/image/ArrowButtonLeft.svg";
// import arrowButtonRight from "../../assets/image/arrowButtonRight.svg";
import arrowUpMin from "../../assets/image/ArrowUpMin.svg";

const ExchangeRatesPage = () => {
  // const [x, setX] = useState(0);
  const [exchangeRates, setExchangeRates] = useState<exchangeRates>();
  // const moveBlockLeft = () => {
  //   // setX(x + 10)
  //   // if (x === 0) setX(-30)
  // };
  // const moveBlockRight = () => {
  //   // setX(x - 10)
  //   // if (x === 10) setX(0)
  // };
  useEffect(() => {
    axios.get("http://localhost:5000/api/exchangeRates").then((res) => {
      setExchangeRates(res.data[0].exchangeRates);
    });
  }, []);

  return (
    <>
      <div className={classes.wrapper}>
        <NavBar/>
        <main className={classes.main}>
          <div className={classes.main_title}>
            <h1 className={classes.main_title_text}>Курсы валют</h1>
            <Input
              className={classes.main_title_input}
              placeholder="Поиск валюты"
            />
          </div>

          <div className={classes.main_wrapper__slider}>
            {/*<SlideButton img={arrowButtonLeft} onClick={moveBlockLeft}/>*/}

            {exchangeRates
              ?.map((slide, index) => (
                <SliderRate
                  key={index}
                  currency={slide.currencyName}
                  rates={slide.rubleRatio}
                />
              ))
              .splice(1, 4)}

            {/*<SlideButton img={arrowButtonRight} onClick={moveBlockRight}/>*/}
          </div>

          <div className={classes.main_wrapper__chart__title}>
            <div className={classes.main_wrapper__chart__title_text}>
              <p className={classes.main_wrapper__chart__title_text_top}>
                USD / RUB • CURRENCY
              </p>
              <p className={classes.main_wrapper__chart__title_text_bottom}>
                US Dollar/Russian Ruble
              </p>
            </div>

            <NavLink to="/currency-exchange">
              <ButtonMui
                fontSize="12px"
                fontWeight="600"
                padding="12px 24px"
                text="Обменять"
                coloring="white"
                bc="#363636"
                hb="#363636"
              />
            </NavLink>
          </div>
          <div className={classes.main_wrapper__chart}>
            <div className={classes.main_wrapper__chart_price}>
              <p className={classes.main_wrapper__chart_price_currency}>
                83,8750
              </p>
              <p className={classes.main_wrapper__chart_price_percent}>
                <img src={arrowUpMin} alt="Проценты"/>
                0,45 %
              </p>
              <p className={classes.main_wrapper__chart_price_plus}>
                +0,3750 Today
              </p>
            </div>
          </div>
          <Charts/>
        </main>
        <ProfileBar/>
      </div>
    </>
  );
};

export default ExchangeRatesPage;
