import React, {useState} from "react";


import {useForm} from "react-hook-form";

import NavBar from "../NavBar/NavBar";
import ProfileBar from "../ProfileBar/ProfileBar";
import ButtonMui from "../MUI/Button/ButtonMui";

import {useActions} from "../../hooks/useAction";
import {useTypedSelector} from "../../hooks/useTypesSelector";

import axios from "axios";
import Cookies from "js-cookie";

import classes from "./Profile.module.scss";

type Inputs = {
  name: string;
  email: string;
  city: string;
  birthday: string;
  phoneNumber: number;
  oldPassword: string;
  password: string;
  cPassword: string;

};

const Profile = () => {
  const {register, handleSubmit, reset, watch, formState: {errors}} = useForm<Inputs>({mode: "onChange"});
  const {users} = useTypedSelector((state) => state.user);
  const {FetchUser} = useActions();

  const changePassword = () => {

    reset({password: '', cPassword: '', oldPassword: ""})
  };

  const repeatPassword = watch(`cPassword`)
  return (
    <main className={classes.main}>
      <NavBar/>
      <section className={classes.main_wrapper}>
        <div className={classes.main_wrapper__title}>
          <h1 className={classes.main_wrapper__title_text}>Мой профиль</h1>
          <form className={classes.main_wrapper__title_button} onSubmit={handleSubmit((data) => {
            axios.patch("http://localhost:5000/api/profile", {
                name: !data.name.length ? users[0]?.name : data.name,
                email: !data.email.length ? users[0]?.email : data.email,
                city: !data.city.length ? users[0]?.city : data.city,
                birthday: !data.birthday ? users[0]?.birthday : data.birthday,
                phoneNumber: !data.phoneNumber ? users[0].phoneNumber : data.phoneNumber
              },
              {
                headers: {Authorization: `${Cookies.get("TOKEN")}`},
              }
            )
              .then(() => {
                FetchUser();

              });
          })}>
            <ButtonMui
              bc="#363636"
              coloring="#FFFFFF"
              text="Сохранить изменения"
              padding="12px 24px"
              fontWeight="600"
              // disabled=
              //   {
              //     !watch(`name`)
              //     &&
              //     !watch(`email`)
              //     &&
              //     !watch(`city`)
              //     &&
              //     !watch(`birthday`)
              //     &&
              //     !watch(`phoneNumber`)
              //   }
              type="submit"
              fontSize="16px"
            />
          </form>
        </div>
        {/*{isSnackBar && (*/}
        {/*  <CustomizedSnackbars snack={true}/>*/}
        {/*  )}*/}

        <div className={classes.main_wrapper__content}>
          <div className={classes.main_wrapper__content__title__info}>
            <p>Информация о вашей учетной записи</p>
          </div>
          <form className={classes.main_wrapper__content__input}>
            <input

              placeholder="Имя, Фамилия"
              defaultValue={users[0]?.name}
              className={classes[`${!errors.name ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}
              {...register(`name`, {
                pattern: {
                  value: /^[а-яА-ЯЁ ё]+$/,
                  message: 'Введено некорректное значение'
                }, minLength: {
                  value: 5,
                  message: 'Введено некорректное значение'
                }
              })}

            />

            {errors.name && (
              <><p>{errors.name.message}</p></>
            )}
            <input
              {...register(`email`, {
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Введено некорректное значение"
                }
              })}
              placeholder="Email"
              type="email"
              defaultValue={users[0]?.email}
              className={classes[`${!errors.email ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}
            />
            {errors.email && (
              <><p>{errors.email.message}</p></>
            )}

            <input

              placeholder="Город"
              className={classes[`${!errors.city ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}
              {...register(`city`, {
                pattern: {
                  value: /^[а-яА-ЯЁ ё]+$/,
                  message: "Введено некорректное значение"
                },
                minLength: {
                  value: 3,
                  message: "Введено некорректное значение"
                }
              })}
              defaultValue={users[0]?.city}
            />
            {errors.city && (
              <><p>{errors.city.message}</p></>
            )}

            <input
              placeholder="Дата рождения"
              {...register(`birthday`, {
                pattern: {
                  value: /^(?:0[1-9]|[12]\d|3[01])([\/.-])(?:0[1-9]|1[012])\1(?:19|20)\d\d$/,
                  message: "Введено некорректное значение"
                }
              })}
              defaultValue={users[0]?.birthday}
              className={classes[`${!errors.birthday ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}
            />
            {errors.birthday && (
              <><p>{errors.birthday.message}</p></>
            )}

            <input
              placeholder="Номер телефона"
              className={classes[`${!errors.phoneNumber ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}
              {...register(`phoneNumber`, {
                  pattern: {
                    value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                    message: 'Введено некорректное значение'
                  }
                }
              )}
              defaultValue={users[0]?.phoneNumber}

              type="number"
            />
            {errors.phoneNumber && (
              <>
                <p>{errors.phoneNumber.message}</p>
              </>
            )}
            <div className={classes.main_wrapper__title_button_bottom}>
              <ButtonMui
                bc="#363636"
                coloring="#FFFFFF"
                text="Сохранить изменения"
                padding="12px 24px"
                hb="#363636"
                fontWeight="600"
                // disabled={isDisabled}
                type="submit"
                fontSize="12px"
              />
            </div>
          </form>

          <div className={classes.main_wrapper__content__title__password}>
            <p>Пароль</p>
          </div>
          <form className={classes.main_wrapper__content__input} onSubmit={handleSubmit((data) => {

            axios.patch(
              "http://localhost:5000/api/profile/changePassword", {
                password: data?.oldPassword,
                newPassword: data?.password,
              },
              {headers: {Authorization: `${Cookies.get("TOKEN")}`}}
            )
              .then(() => {
                FetchUser();
              }).catch(function () {
              }
            );
          })}>

            <input
              placeholder="Введите старый пароль"
              type="password"
              {...register(`oldPassword`, {
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
                  message: 'Ошибка'
                }
              })}
              className={classes[`${!errors.oldPassword ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}

            />
            {errors.oldPassword && (
              <><p>{errors.oldPassword.message}</p></>
            )}

            <input
              placeholder="Введите новый пароль"
              type="password"
              {...register(`password`, {
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
                  message: 'Ошибка'
                }
              })}
              className={classes[`${!errors.password ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}
            />
            {errors.password && (
              <><p>{errors.password.message}</p></>
            )}
            <input
              placeholder="Повторите новый пароль"
              type="password"
              {...register(`cPassword`)}
              className={classes[`${repeatPassword === watch(`password`) ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}
              // onBlur={repeatsPassword}
              // value={repeatPassword}
              // onChange={(e) => setRepeatPassword(e.target.value)}
            />
            {repeatPassword !== watch(`password`) && (
              <><p>Пароли не совпадают</p></>
            )}


            <ButtonMui
              bc="#363636"
              text="Изменить пароль"
              coloring="white"
              padding="15px 24px"
              hb="#363636"
              fontSize="16px"
              type='submit'
              disabled={
                Boolean(repeatPassword !== watch(`password`)
                  ||
                  !repeatPassword?.length
                  ||
                  errors.password
                  ||
                  !watch(`oldPassword`)?.length
                  ||
                  errors.oldPassword
                )}
              fontWeight="600"
              onClick={changePassword}
            />
          </form>
        </div>
      </section>
      <ProfileBar/>
    </main>
  );
};

export default Profile;
