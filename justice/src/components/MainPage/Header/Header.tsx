import React from "react";

import ButtonMui from "../../MUI/Button/ButtonMui";
import styles from "./Header.module.scss";
import {NavLink} from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <p></p>
      <nav className={styles.header__nav}>
        <div className={styles.header__nav__text}>
          <p className={styles.text_bold}>Justice</p>
          <p className={styles.text_regular}>Finance</p>
        </div>
        <div className={styles.header__nav__button}>
          <NavLink to="/login-page">
            <ButtonMui
              text="Войти"
              padding="12px 24px"
              backgroundColor="#363636"
              fontColor="#FFFFFF"
              fontSize="12px"
              hoverBackground="#363636"
              borderRadius="none"
              fontWeight="600"
            />
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
