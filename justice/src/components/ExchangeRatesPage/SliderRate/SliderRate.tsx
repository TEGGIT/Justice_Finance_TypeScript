import React from 'react';
import classes from "../ExchangeRatesPage.module.scss";
import arrowUp from "../../../assets/image/ArrowUp.svg";

interface currencyExchange{
  currency: string,
  rates: string,
}

const SliderRate:React.FC<currencyExchange> = (props) => {
  const {
   currency,
   rates
 } = props
  return (
    <div className={classes.main_wrapper__slider__rate}>
      <img src={arrowUp} alt="Положительно" className={classes.main_wrapper__slider__rate_img}/>
      <div className={classes.main_wrapper__slider__rate_wrapper}>
        <div className={classes.main_wrapper__slider__rate__country}>
          <p>{currency} / RUB</p>
          <p className={classes.main_wrapper__slider__rate__country_percent}>0,13%</p>
        </div>
        <div className={classes.main_wrapper__slider__rate__positive}>
          <p style={{width:"100px"}} >{rates}</p>
          <p className={classes.main_wrapper__slider__rate__positive_plus}>+0,2380</p>
        </div>
      </div>
    </div>

  );
};

export default SliderRate;