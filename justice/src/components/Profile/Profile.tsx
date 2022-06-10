import React from "react";


import {useForm, SubmitHandler} from "react-hook-form";

import NavBar from "../NavBar/NavBar";
import ProfileBar from "../ProfileBar/ProfileBar";
import ButtonMui from "../MUI/Button/ButtonMui";
import Input from "../UI/Input/Input";


import {useActions} from "../../hooks/useAction";
import {useTypedSelector} from "../../hooks/useTypesSelector";

import axios from "axios";
import Cookies from "js-cookie";

import classes from "./Profile.module.scss";

type Inputs = {
  name: string,
  email: string,
};

const Profile = () => {
  const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  const {users} = useTypedSelector((state) => state.user);
  const {FetchUser} = useActions();


  const changeProfile = () => {
    // axios
    //   .patch(
    //     "http://localhost:5000/api/profile",
    //     {
    //       name,
    //       email,
    //       city,
    //       birthday,
    //       phoneNumber: number,
    //     },
    //     {
    //       headers: {Authorization: `${Cookies.get("TOKEN")}`},
    //     }
    //   )
    //   .then(() => {
    //     FetchUser();
    //   });
  };
  const changePassword = () => {
    // axios.patch(
    //   "http://localhost:5000/api/profile/changePassword", {
    //     password: oldPassword,
    //     newPassword: password,
    //   },
    //   {headers: {Authorization: `${Cookies.get("TOKEN")}`}}
    // )
    //   .then(() => {
    //     FetchUser();
    //     setIsPasswordError(false)
    //   }).catch(function () {
    //     setIsPasswordError(true)
    //   }
    // );
  };
  return (
    <main className={classes.main}>
      <NavBar/>
      <section className={classes.main_wrapper}>
        <div className={classes.main_wrapper__title}>
          <h1 className={classes.main_wrapper__title_text}>Мой профиль</h1>
          <div className={classes.main_wrapper__title_button}>
            <ButtonMui
              type={'submit'}
              bc="#363636"
              coloring="#FFFFFF"
              text="Сохранить изменения"
              padding="12px 24px"
              fontWeight="600"
              // disabled={isDisabled}
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
          <form className={classes.main_wrapper__content__input} onSubmit={handleSubmit(onSubmit)}>

            <Input
              placeholder="Имя, Фамилия"
              defaultValue={users[0]?.name}
              {...register("name")}
              // value={name}
              // onChange={(e) => setName(e.target.value)}
              className={classes.main_wrapper__content__input_input}
            />

            <Input
              placeholder="Email"
              type="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className={classes.main_wrapper__content__input_input}
            />

            <Input
              placeholder="Город"
              className={classes.main_wrapper__content__input_input}
              // value={city}
              // onChange={(e) => setCity(e.target.value)}
            />

            <Input
              placeholder="Дата рождения"
              className={classes.main_wrapper__content__input_input}
              // value={birthday}
              // onChange={(e) => setBirthday(e.target.value)}
            />

            <Input
              placeholder="Номер телефона"
              className={classes.main_wrapper__content__input_input}
              // value={number}
              type="number"
              // onChange={(e) => setNumber(e.target.valueAsNumber)}
            />
          </form>
          <div className={classes.main_wrapper__title_button_bottom}>
            <ButtonMui
              bc="#363636"
              coloring="#FFFFFF"
              text="Сохранить изменения"
              padding="12px 24px"
              hb="#363636"
              fontWeight="600"
              // disabled={isDisabled}
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
              // onBlur={passwordChecker}
              // value={oldPassword}
              // onChange={(e) => setOldPassword(e.target.value)}
            />

            <Input
              placeholder="Повторите новый пароль"
              type="password"
              className={classes.main_wrapper__content__input_input}
              // onBlur={repeatsPassword}
              // value={repeatPassword}
              // onChange={(e) => setRepeatPassword(e.target.value)}
            />

            <Input
              placeholder="Введите новый пароль"
              type="password"
              className={classes.main_wrapper__content__input_input}
              // onBlur={newPassword}
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
            />

            <ButtonMui
              bc="#363636"
              text="Изменить пароль"
              coloring="white"
              padding="15px 24px"
              hb="#363636"
              fontSize="16px"
              // disabled={isDisabledPassword}
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
