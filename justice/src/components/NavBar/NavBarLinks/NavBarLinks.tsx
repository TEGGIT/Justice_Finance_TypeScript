import React from "react";

import { NavLink } from "react-router-dom";

import ButtonMui from "../../MUI/Button/ButtonMui";

import classes from "./NavBarLinks.module.scss";

import exchangeRates from "../../../assets/image/echangeRates.svg";
import userIcon from "../../../assets/image/userIcon.svg";
import arrow from "../../../assets/image/Arrow.svg";
import suitcase from "../../../assets/image/Suitcase.svg";
import checklist from "../../../assets/image/Checklist.svg";
import logOut from "../../../assets/image/LogOut.svg";
import Cookies from "js-cookie";

const NavBarLinks = () => {
  const clear = () => {
    Cookies.remove("TOKEN");
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
                backgroundcolor="#FFFFFF"
                fontcolor="#363636"
                fontSize="0.875rem"
                border="none"
                hoverbackground="transparent"
                borderradius="0"
                disabled={false}
                direction="row"
                fontWeight="500"
                height="auto"
                mt="0"
                onClick={() => ({})}
                type="button"
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
              backgroundcolor="#FFFFFF"
              fontcolor="#363636"
              fontSize="0.875rem"
              hoverbackground="transparent"
              mt="200px"
              border="0"
              borderradius="0"
              disabled={false}
              direction="0"
              fontWeight="500"
              height="auto"
              type="button"
            />
          </NavLink>
        </div>
        <div className={classes.mobile}>
          <NavLink to="/">
            <ButtonMui
              onClick={clear}
              text="Выход"
              icon={logOut}
              padding="12px 61px 12px 8px"
              gap="8px"
              backgroundcolor="#FFFFFF"
              fontcolor="#363636"
              fontSize="0.875rem"
              hoverbackground="transparent"
              mt="0"
              border="0"
              borderradius="0"
              disabled={false}
              direction="0"
              fontWeight="500"
              height="auto"
              type="button"
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBarLinks;
