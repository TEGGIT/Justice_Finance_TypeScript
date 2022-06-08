import React, {useEffect} from "react";

import {NavLink} from "react-router-dom";

import Cookies from "js-cookie";

import ButtonMui from "../../MUI/Button/ButtonMui";

import classes from "./NavBarLinks.module.scss";

import exchangeRates from "../../../assets/image/echangeRates.svg";
import userIcon from "../../../assets/image/userIcon.svg";
import arrow from "../../../assets/image/Arrow.svg";
import suitcase from "../../../assets/image/Suitcase.svg";
import checklist from "../../../assets/image/Checklist.svg";
import logOut from "../../../assets/image/LogOut.svg";
import {useActions} from "../../../hooks/useAction";


const NavBarLinks = () => {
  const {loginUser} = useActions();

  const clear = () => {
    Cookies.remove("TOKEN");
    loginUser(false)
  };

  const item = [
    {
      img: exchangeRates,
      text: "Курсы валют",
      pass: "/exchange-rates-page",
    },
    {
      img: userIcon,
      text: "Мой профиль",
      pass: "/profile-page",
    },
    {
      img: arrow,
      text: "Обмен валют",
      pass: "/currency-exchange",
    },
    {
      img: suitcase,
      text: "Кошельки",
      pass: "/purse-page",
    },
    {
      img: checklist,
      text: "Транзакции",
      pass: "/transactions-page",
    },
  ];

  return (
    <div>
      <div className={classes.nav_bar_links}>
        {item.map((items) => {
          return (
            <NavLink key={items.pass} to={`${items.pass}`}>
              <ButtonMui
                text={items.text}
                icon={items.img}
                padding="12px 0 12px 8px"
                gap="8px"
                bc="#FFFFFF"
                coloring="#363636"
                fontSize="0.875rem"
                border="none"
                hb="transparent"
                rounding="0"
                disabled={false}
                direction="row"
                fontWeight="500"
              />
            </NavLink>
          );
        })}
        <div className={classes.desktop}>
          <NavLink to="/">
            <ButtonMui
              onClick={clear}
              text="Выход"
              icon={logOut}
              padding="12px 61px 12px 8px"
              gap="8px"
              bc="#FFFFFF"
              coloring="#363636"
              fontSize="0.875rem"
              hb="transparent"
              mt="200px"
              fontWeight="500"
            />
          </NavLink>
        </div>
        <div className={classes.mobile}>
          <ButtonMui
            onClick={clear}
            text="Выход"
            icon={logOut}
            padding="12px 61px 12px 8px"
            gap="8px"
            bc="#FFFFFF"
            coloring="#363636"
            fontSize="0.875rem"
            hb="transparent"
            fontWeight="500"
          />
        </div>
      </div>
    </div>
  );
};

export default NavBarLinks;
