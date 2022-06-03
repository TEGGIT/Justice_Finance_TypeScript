import React from 'react';

import ButtonMui from "../../MUI/Button/ButtonMui";
import styles from "./Header.module.scss";

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
                        <ButtonMui style={{padding: 0}}>Войти</ButtonMui>

                    </div>
                </nav>
            </header>
    );
};

export default Header;