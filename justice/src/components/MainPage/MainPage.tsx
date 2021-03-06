import React from "react";
import Header from "./Header/Header";

import classes from "./MainPage.module.scss";

import background from "../../assets/image/background.png";
import starOne from "../../assets/image/StarOne.svg";
import interfaceFinance from "../../assets/image/interface.png";
import starTwo from "../../assets/image/StarTwo.svg";
import positive from "../../assets/image/Positive.png";

const MainPage = () => {
  return (
    <div
      className={classes.background}
      style={{ backgroundImage: `url(${background})` }}
    >
      <Header />
      <main className={classes.main}>
        <div className={classes.ellipseOne} />
        <div
          className={classes.starOne}
          style={{ backgroundImage: `url(${starOne})` }}
        />
        <div className={classes.ellipseTwo} />
        <div
          className={classes.starTwo}
          style={{ backgroundImage: `url(${starTwo})` }}
        />
        <section className={classes.main__section}>
          <div className={classes.main__section__title}>
            <h1 className={classes.title}>
              Обменивайте валюту по выгодному курсу
            </h1>
          </div>
          <div className={classes.main__section__content}>
            <img
              src={interfaceFinance}
              alt="interface"
              className={classes.image}
            />
            <div
              className={classes.test}
              style={{ backgroundImage: `url(${positive})` }}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainPage;
