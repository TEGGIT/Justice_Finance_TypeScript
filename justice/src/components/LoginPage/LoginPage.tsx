import React, { useEffect, useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import ButtonMui from "../MUI/Button/ButtonMui";
import Input from "../UI/Input/Input";
import CheckBox from "../UI/CheckBox/CheckBox";

import classes from "./LoginPage.module.scss";

import image from "../../assets/image/IllustrationOne.svg";
import google from "../../assets/image/google.svg";
import github from "../../assets/image/github.svg";
import Cookies from "js-cookie";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isDisabledBtn, setIsDisabledBtn] = useState(true);
  const [checked, setChecked] = React.useState(false);

  const navigate = useNavigate();

  const checkUser = () => {
    axios
      .post("http://localhost:5000/api/auth/login-page", {
        email,
        password,
      })
      .then((responce) => {
        Cookies.set("TOKEN", responce.data.token);
        navigate("/exchange-rates-page", { replace: true });
      });
  };
  const checkEmail = () => {
    const emailChecker = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
    if (!emailChecker.test(email)) {
      setIsEmailError(true);
    } else {
      setIsEmailError(false);
    }
  };

  const checkPassword = () => {
    const passwordChecker = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!passwordChecker.test(password)) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }
  };

  useEffect(() => {
    if (!email || !password || isEmailError || isPasswordError) {
      setIsDisabledBtn(true);
    } else {
      setIsDisabledBtn(false);
    }
  }, [email, password, isEmailError, isPasswordError]);

  const handleChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setChecked(event.target.checked);
  };

  return (
    <main className={classes.main}>
      <div className={classes.main__login}>
        <div className={classes.main__login_wrapper}>
          <form className={classes.main__login_wrapper__form}>
            <p className={classes.main__login_wrapper__form_text}>Вход</p>
            <div className={classes.main__login_wrapper__form__buttons}>
              <div className={classes.desktop_button}>
                <ButtonMui
                  fontSize="12px"
                  icon={google}
                  text="Sing up with Google"
                  gap="8px"
                  coloring="#363636"
                  border="1px solid #ECECEC"
                  padding="16px 25px 16px 30px"
                  fontWeight="500"
                />

                <ButtonMui
                  fontSize="12px"
                  icon={github}
                  text="Sing up with GitHub"
                  gap="8px"
                  coloring="#363636"
                  border="1px solid #ECECEC"
                  padding="16px 25px 16px 30px"
                  fontWeight="500"
                />
              </div>
              <div className={classes.mobile_button}>
                <ButtonMui
                  fontSize="10px"
                  icon={google}
                  text="Sing up with Google"
                  gap="6px"
                  coloring="#363636"
                  border="1px solid #ECECEC"
                  padding="12px 12px 12px 12px"
                  fontWeight="500"
                />

                <ButtonMui
                  fontSize="10px"
                  icon={github}
                  text="Sing up with GitHub"
                  gap="6px"
                  coloring="#363636"
                  border="1px solid #ECECEC"
                  padding="12px 12px 12px 12px"
                  fontWeight="500"
                />
              </div>
            </div>
            <div className={classes.line_wrapper}>
              <div className={classes.line} />
              <p className={classes.line__text}>Or</p>
              <div className={classes.line} />
            </div>
            <div className={classes.input_wrapper}>
              {isEmailError ? (
                <Input
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={classes.input_error}
                  type="email"
                  onBlur={checkEmail}
                />
              ) : (
                <Input
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={classes.input}
                  type="email"
                  onBlur={checkEmail}
                />
              )}
              {isPasswordError ? (
                <Input
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={classes.input_error}
                  type="password"
                  onBlur={checkPassword}
                />
              ) : (
                <Input
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={classes.input}
                  type="password"
                  onBlur={checkPassword}
                />
              )}

              <div className={classes.checkbox}>
                <CheckBox onChange={handleChange} checked={checked} />
                <p>Запомнить меня</p>
              </div>
            </div>
            <div className={classes.desktop_button}>
              <ButtonMui
                text="Войти"
                fontSize="1rem"
                padding="12px 195px"
                bc="#363636"
                coloring="#FFFFFF"
                hb="#363636"
                fontWeight="600"
                onClick={checkUser}
                disabled={isDisabledBtn}
              />
            </div>
            <div className={classes.mobile_button}>
              <ButtonMui
                text="Войти"
                fontSize="1rem"
                padding="12px 100px"
                bc="#363636"
                coloring="#FFFFFF"
                hb="#363636"
                fontWeight="600"
                onClick={checkUser}
                disabled={isDisabledBtn}
              />
            </div>
            <div className={classes.newperson}>
              <p>
                Нет аккаунта?{" "}
                <NavLink to="/register-page" className={classes.signup}>
                  Создать аккаунт
                </NavLink>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className={classes.main__image}>
        <NavLink to="/" className={classes.main__image_text}>
          <p className={classes.text_bold}>Justice</p>
          <p className={classes.text_regular}>Finance</p>
        </NavLink>
        <div className={classes.main__image_wrapper}>
          <img src={image} alt="SignUp" />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
