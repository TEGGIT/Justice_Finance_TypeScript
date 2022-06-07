import React, {useEffect, useState} from "react";

import NavBar from "../NavBar/NavBar";
import ProfileBar from "../ProfileBar/ProfileBar";
import ButtonMui from "../MUI/Button/ButtonMui";
import Input from "../UI/Input/Input";

import classes from "./Profile.module.scss";

import axios from "axios";
import {useTypedSelector} from "../../hooks/useTypesSelector";
import Cookies from "js-cookie";
import {useActions} from "../../hooks/useAction";
// import CustomizedSnackbars from "../MUI/Snackbar/Snackbar";

const Profile = () => {

  const {users} = useTypedSelector(state => state.user)
  const {FetchUser} = useActions()


  const [name, setName] = useState(users[0]?.name);
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [birthday, setBirthday] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledPassword, setIsDisabledPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [isOldPassword, setIsOldPassword] = useState(true);
  const [isSnackBar, setIsSnackBar] = useState(false);


  const passwordChecker = () => {
    // if (password.password === oldPassword) {
    //   setIsOldPassword(false)
    // } else {
    //   setIsOldPassword(true)
    // }
  };
  useEffect(() => {
    FetchUser()

  }, [])
  const repeatsPassword = () => {
    if (password === repeatPassword) {
      setIsOldPassword(false);
    } else {
      setIsOldPassword(true);
    }
  };
  const newPassword = () => {
    const passwordChecker = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!passwordChecker.test(password)) {
      setIsOldPassword(true);
    } else {
      setIsOldPassword(false);
    }
  };

  useEffect(() => {
    setEmail(users[0]?.email)
    setName(users[0]?.name)
    setCity(users[0]?.city)
    setBirthday(users[0]?.birthday)
    setNumber(users[0]?.phoneNumber)


  }, [])

  // useEffect(() => {
  //   if (!isOldPassword && repeatPassword && password) {
  //     setIsDisabledPassword(false)
  //   } else
  //     setIsDisabledPassword(true)
  //
  // }, [isOldPassword, repeatPassword, password])

  useEffect(() => {
    if (!name || !email) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [name, email]);

  const changeProfile = () => {

    axios.patch('http://localhost:5000/api/profile', {
      name,
      email,
      city,
      birthday,
      phoneNumber: number,
    }, {
      headers:
        {Authorization: `${Cookies.get("TOKEN")}`}
    },).then(() => {
    })
    setIsSnackBar(true)

  };
  const changePassword = () => {
    // axios.patch('http://localhost:5000/api/profile/changePassword', {
    // password: oldPassword,
    //   newPassword: password
    // },{headers:{Authorization: Cookies.get("TOKEN")}},).then((responce) => {
    //   console.log(responce.data)
    // })
    // setPassword('')
    // setOldPassword('')
    // setRepeatPassword('')
  };

  return (
    <main className={classes.main}>
      <NavBar/>
      <section className={classes.main_wrapper}>
        <div className={classes.main_wrapper__title}>
          <h1 className={classes.main_wrapper__title_text}>Мой профиль</h1>
          <div className={classes.main_wrapper__title_button}>
            <ButtonMui
              backgroundColor="#363636"
              fontColor="#FFFFFF"
              text="Сохранить изменения"
              padding="12px 24px"
              fontWeight="600"
              disabled={isDisabled}
              onClick={changeProfile}
              fontSize="16px"
            />
          </div>
        </div>
        {/*{isSnackBar && (*/}
        {/*  <CustomizedSnackbars snack={true}/>*/}
        {/*  )}*/}

        <div className={classes.main_wrapper__content}>
          <div className={classes.main_wrapper__content__title__info}>
            <p>Информация о вашей учетной записи</p>
          </div>
          <div className={classes.main_wrapper__content__input}>
            <Input
              placeholder="Имя, Фамилия"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={classes.main_wrapper__content__input_input}
            />

            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={classes.main_wrapper__content__input_input}
            />

            <Input
              placeholder="Город"
              className={classes.main_wrapper__content__input_input}
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <Input
              placeholder="Дата рождения"
              className={classes.main_wrapper__content__input_input}
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />

            <Input
              placeholder="Номер телефона"
              className={classes.main_wrapper__content__input_input}
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className={classes.main_wrapper__title_button_bottom}>
            <ButtonMui
              backgroundColor="#363636"
              fontColor="#FFFFFF"
              text="Сохранить изменения"
              padding="12px 24px"
              hoverBackground="#363636"
              fontWeight="600"
              disabled={isDisabled}
              onClick={changeProfile}
              fontSize="12px"
            />
          </div>
          <div className={classes.main_wrapper__content__title__password}>
            <p>Пароль</p>
          </div>
          <div className={classes.main_wrapper__content__input}>
            <Input
              placeholder="Введите старый пароль"
              type="password"
              className={classes.main_wrapper__content__input_input}
              onBlur={passwordChecker}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />

            <Input
              placeholder="Повторите новый пароль"
              type="password"
              className={classes.main_wrapper__content__input_input}
              onBlur={repeatsPassword}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />

            <Input
              placeholder="Введите новый пароль"
              type="password"
              className={classes.main_wrapper__content__input_input}
              onBlur={newPassword}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <ButtonMui
              backgroundColor="#363636"
              text="Изменить пароль"
              fontColor="white"
              padding="15px 24px"
              hoverBackground="#363636"
              fontSize="16px"
              disabled={isDisabledPassword}
              fontWeight="600"
              onClick={changePassword}
            />
          </div>
        </div>
      </section>
      <ProfileBar/>
    </main>
  );
};

export default Profile;
