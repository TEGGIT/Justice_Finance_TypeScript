import React from 'react';
import classes from './NavBar.module.scss'

import NavBarLinks from './NavBarLinks/NavBarLinks';

const NavBar = () => {
  return (
    <header className={classes.header__bar}>
      <nav className={classes.header__bar__nav}>
        <div className={classes.header__bar__nav__title}>
          <p className={classes.text_bold}>Justice</p>
          <p className={classes.text_regular}>Finance</p>
        </div>
        <NavBarLinks/>
      </nav>
    </header>
  );
};

export default NavBar;