import React from "react";
import classes from "../TransactionsPage.module.scss";
import exchange from "../../../assets/image/ExchangeIcon.svg";
import {CurrencyType} from "../../../types/currency";

interface transaction {
  exchangeValue: string;
  time: string;
  changeValue: string;
  currency: CurrencyType | string;
  plus: string;
  currencyPlus: string;
  status: string;
  styles: string;
}

const TransactionStatus: React.FC<transaction> = (props) => {
  const {
    exchangeValue,
    time,
    changeValue,
    currency,
    plus,
    currencyPlus,
    status,
    styles,
  } = props;

  return (
    <div className={classes.main__wrapper__rows}>
      <div className={classes.main__wrapper__rows_info}>
        <img src={exchange} alt="обмен"/>
        <div className={classes.main__wrapper__rows_info_date_container}>
          <p className={classes.main__wrapper__rows_info_date_container_upper}>
            {exchangeValue}
          </p>
          <p className={classes.main__wrapper__rows_info_date_container_lower}>
            {time}
          </p>
        </div>
      </div>
      <div className={classes.main__wrapper__rows_info_count}>
        <p className={classes.main__wrapper__rows_info_date_container_upper}>
          {changeValue}
        </p>
        <p className={classes.main__wrapper__rows_info_date_container_lower}>
          {currency}
        </p>
      </div>
      <div className={classes.main__wrapper__rows_info_plus}>
        <p className={classes.main__wrapper__rows_info_date_container_upper}>
          +{plus}
        </p>
        <p className={classes.main__wrapper__rows_info_date_container_lower}>
          {currencyPlus}
        </p>
      </div>
      <div className={classes.main__wrapper__rows_info_status}>
        <p className={styles}>{status}</p>
      </div>
    </div>
  );
};

export default TransactionStatus;
