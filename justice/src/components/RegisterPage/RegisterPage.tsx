import React, {useEffect, useState} from 'react';

import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";

import Input from "../UI/Input/Input";
import CheckBox from "../UI/CheckBox/CheckBox";
import ButtonMui from "../MUI/Button/ButtonMui";


import classes from "./RegisterPage.module.scss";
import image from "../../assets/image/IllustrationTwo.svg";
import google from "../../assets/image/google.svg";
import github from "../../assets/image/github.svg";

const RegisterPage = () => {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [disabledBtn, setDisabledBtn] = useState(true)
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [repeatPassword, setRepeatPassword] = useState('')
  const [repeatPasswordError, setRepeatPasswordError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const nameErrorChecker = () => {
    const nameChecker = new RegExp(`^(?=.*[а-я])(?=.*[А-Я])(?=.{${2},})`)
    if (!nameChecker.test(name)) {
      setNameError(true)
    } else {
      setNameError(false)
    }
  }


  const emailErrorChecker = () => {
    const emailChecker = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/
    if (!emailChecker.test(email)) {
      setEmailError(true)
    } else {
      setEmailError(false)
    }
  }
  const passwordErrorChecker = () => {
    const passwordChecker = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    if (!passwordChecker.test(password)) {
      setPasswordError(true)
    } else {
      setPasswordError(false)
    }
  }
  const passwordRepeatChecker = () => {
    if (password !== repeatPassword) {
      setRepeatPasswordError(true)
    } else {
      setRepeatPasswordError(false)
    }
  }

  const registration = () => {
    // axios.post('http://localhost:5000/api/auth/register-page', {
    //   "name": name,
    //   "email": email,
    //   "password": password
    // }).then((responce) => {
    //   console.log(responce.data)
    // })
    // navigate("/login-page", {replace: true});

  }

  useEffect(() => {
    if (!name || !email || !password || !repeatPassword || repeatPasswordError || !checked) {
      setDisabledBtn(true)

    } else {
      setDisabledBtn(false)

    }
  }, [name, email, password, repeatPassword, repeatPasswordError, checked])


  return (

    <main className={classes.main}>
      {/*//todo:допилить мобильную адаптацию*/}
      <div className={classes.main__register}>
        <div className={classes.main__register_wrapper}>
          <form className={classes.main__register_wrapper__form}>
            <p className={classes.main__register_wrapper__form_text}>Регистрация</p>
            <div className={classes.main__register_wrapper__form__buttons}>
              <ButtonMui
                fontSize='12px'
                img={google}
                text='Sing up with Google'
                gap="13px"
                color='#363636'
                border='1px solid #ECECEC'
                padding="16px 25px 16px 30px"
                fontWeight='500'
              />

              <ButtonMui
                fontSize='12px'
                img={github}
                text='Sing up with Google'
                gap="13px"
                color='#363636'
                border='1px solid #ECECEC'
                padding="16px 25px 16px 30px"
                fontWeight='500'
              />
            </div>
            <div>
            </div>
            <div className={classes.line_wrapper}>
              <div className={classes.line}/>
              <p className={classes.line__text}>Or</p>
              <div className={classes.line}/>
            </div>
            <div className={classes.input_wrapper}>
              {nameError ? (
                <>
                  <Input placeholder="Имя, Фамилия"
                         type='text'
                         className={classes.input_error}
                         onBlur={() => nameErrorChecker()}
                         value={name}
                         onChange={(e) => setName(e.target.value)}/>
                </>
              ) : (
                <Input placeholder="Имя, Фамилия"
                       type='text'
                       className={classes.input}
                       onBlur={() => nameErrorChecker()}
                       value={name}
                       onChange={(e) => setName(e.target.value)}/>
              )}
              {emailError ? (
                <>
                  <Input placeholder='E-mail'
                         className={classes.input_error}
                         type="email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         onBlur={emailErrorChecker}/>
                </>
              ) : (
                <Input placeholder='E-mail'
                       className={classes.input}
                       type="email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       onBlur={emailErrorChecker}/>
              )}
              <div className={classes.input_wrapper_password}>
                {passwordError ? (
                  <>
                    <Input placeholder='Пароль'
                           className={classes.input_error}
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           onBlur={passwordErrorChecker}/>
                  </>

                ) : (
                  <Input placeholder='Пароль'
                         className={classes.input}
                         type="password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         onBlur={passwordErrorChecker}/>
                )}
                {repeatPasswordError ? (
                  <Input placeholder="Подтвердите пароль"
                         className={classes.input_error}
                         onBlur={passwordRepeatChecker}
                         type='password'
                         onChange={(e) => setRepeatPassword(e.target.value)}
                         value={repeatPassword}/>

                ) : (
                  <Input placeholder="Подтвердите пароль"
                         className={classes.input}
                         onBlur={passwordRepeatChecker}
                         type='password'
                         onChange={(e) => setRepeatPassword(e.target.value)}
                         value={repeatPassword}/>
                )}
              </div>
              <div className={classes.checkbox}>
                <CheckBox onChange={(e) => setChecked(e.target.checked)} checked={checked}/>

                <p>
                  i accept the Terms of Service and have read
                  Privacy Policy
                </p>

              </div>
            </div>

            <ButtonMui

              text='Зарегистрироваться'
              padding="12px 180px"
              background='#363636'
              color='#FFFFFF'
              onClick={() => registration()}
              disabled={disabledBtn}
              fontWeight='600'
              hoverBackground='#363636'

                         fontSize="16px"/>

            <div className={classes.newperson}>
              <p> У вас уже есть учетная запись? <NavLink to='/login-page' className={classes.signup}>Авторизоваться
              </NavLink></p>
            </div>
          </form>
        </div>
      </div>
      <div className={classes.main__image}>
        <NavLink to='/' className={classes.main__image_text}>
          <p className={classes.text_bold}>
            Justice
          </p>
          <p className={classes.text_regular}>Finance</p>
        </NavLink>
        <div className={classes.main__image_wrapper}>
          <img src={image} alt="Register"/>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;