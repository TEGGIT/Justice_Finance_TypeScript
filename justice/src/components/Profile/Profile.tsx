import React from "react";


import {useForm, SubmitHandler} from "react-hook-form";

import NavBar from "../NavBar/NavBar";
import ProfileBar from "../ProfileBar/ProfileBar";
import ButtonMui from "../MUI/Button/ButtonMui";

import {useActions} from "../../hooks/useAction";
import {useTypedSelector} from "../../hooks/useTypesSelector";
import {patterns} from "../../patterns/patterns";

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

  const onSubmit: SubmitHandler<Inputs> = data => (data);

  const {users} = useTypedSelector((state) => state.user);

  const {FetchUser} = useActions();

  const changePassword = () => {
    axios.patch("http://localhost:5000/api/profile/changePassword", {
        password: watch(`oldPassword`),
        newPassword: watch(`password`),
      },
      {headers: {Authorization: `${Cookies.get("TOKEN")}`}}
    )
      .then(() => {
        FetchUser(users);
      }).catch(function () {
      }
    );
    reset({password: '', cPassword: '', oldPassword: ""})
  };

  const changeProfile = () => {
    axios.patch("http://localhost:5000/api/profile", {
        name: !watch(`name`) ? users[0]?.name : watch(`name`),
        email: !watch(`email`) ? users[0]?.email : watch(`email`),
        city: !watch(`city`) ? users[0]?.city : watch(`city`),
        birthday: !watch(`birthday`) ? users[0]?.birthday : watch(`birthday`),
        phoneNumber: !watch(`phoneNumber`) ? users[0].phoneNumber : watch(`phoneNumber`)
      },
      {
        headers: {Authorization: `${Cookies.get("TOKEN")}`},
      }
    )
      .then(() => {
        FetchUser(users);
      });
  };
  const repeatPassword = watch(`cPassword`)


  const isValidPassword =
    Boolean(repeatPassword !== watch(`password`)
      ||
      !repeatPassword?.length
      ||
      errors.password
      ||
      !watch(`oldPassword`)?.length
      ||
      errors.oldPassword
    )
  const isValidProfile =
    !watch(`name`)
    &&
    !watch(`email`)
    &&
    !watch(`city`)
    &&
    !watch(`birthday`)
    &&
    !watch(`phoneNumber`)


  return (
    <main className={classes.main}>
      <NavBar/>
      <section className={classes.main_wrapper}>
        <div className={classes.main_wrapper__title}>
          <h1 className={classes.main_wrapper__title_text}>Мой профиль</h1>
          <form className={classes.main_wrapper__title_button} onSubmit={handleSubmit(onSubmit)}>
            <ButtonMui
              bc="#363636"
              coloring="#FFFFFF"
              text="Сохранить изменения"
              padding="12px 24px"
              fontWeight="600"
              disabled={isValidProfile}
              type="submit"
              fontSize="16px"
              onClick={changeProfile}
            />
          </form>
        </div>

        <div className={classes.main_wrapper__content}>
          <div className={classes.main_wrapper__content__title__info}>
            <p>Информация о вашей учетной записи</p>
          </div>
          <form className={classes.main_wrapper__content__input}>
            <div className={classes.input_error_wrapper}>
              <div className={classes.error_wrapper}>
                {errors.name && (
                  <p className={classes.error}>{errors.name.message}</p>
                )}
              </div>
              <input
                placeholder="Имя, Фамилия"
                defaultValue={users[0]?.name}
                className={classes[`${!errors.name ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}
                {...register(`name`, {...patterns.name}
                )}
              />
            </div>
            <div className={classes.input_error_wrapper}>
              <div className={classes.error_wrapper}>
                {errors.email && (
                  <p className={classes.error}>{errors.email.message}</p>
                )}
              </div>

              <input
                {...register(`email`, {...patterns.email})}
                placeholder="Email"
                type="email"
                defaultValue={users[0]?.email}
                className={classes[`${!errors.email ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}
              />
            </div>

            <div className={classes.input_error_wrapper}>
              <div className={classes.error_wrapper}>
                {errors.city && (
                  <p className={classes.error}>{errors.city.message}</p>
                )}
              </div>

              <input
                placeholder="Город"
                className={classes[`${!errors.city ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}
                {...register(`city`, {...patterns.city})}
                defaultValue={users[0]?.city}
              />
            </div>
            <div className={classes.input_error_wrapper}>
              <div className={classes.error_wrapper}>
                {errors.birthday && (
                  <p className={classes.error}>
                    {errors.birthday.message}
                  </p>
                )}
              </div>
              <input
                placeholder="Дата рождения"
                {...register(`birthday`, {...patterns.birthday}
                )}
                defaultValue={users[0]?.birthday}
                className={classes[`${!errors.birthday ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}
              />
            </div>
            <div className={classes.input_error_wrapper}>
              <div className={classes.error_wrapper}>
                {errors.phoneNumber && (
                  <>
                    <p className={classes.error}>{errors.phoneNumber.message}</p>
                  </>
                )}
              </div>
              <input
                placeholder="Номер телефона"
                className={classes[`${!errors.phoneNumber ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}
                {...register(`phoneNumber`, {...patterns.phoneNumber})}
                defaultValue={users[0]?.phoneNumber}
                type="number"
              />
            </div>
            <div className={classes.main_wrapper__title_button_bottom}>
              <ButtonMui
                bc="#363636"
                coloring="#FFFFFF"
                text="Сохранить изменения"
                padding="12px 24px"
                hb="#363636"
                fontWeight="600"
                disabled={isValidProfile}
                type="submit"
                fontSize="12px"
                onClick={changeProfile}
              />
            </div>
          </form>

          <div className={classes.main_wrapper__content__title__password}>
            <p>Пароль</p>
          </div>
          <form className={classes.main_wrapper__content__input} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.input_error_wrapper}>
              <div className={classes.error_wrapper}>
                {errors.oldPassword && (
                  <p className={classes.error}>{errors.oldPassword.message}</p>
                )}
              </div>

              <input
                placeholder="Введите старый пароль"
                type="password"
                {...register(`oldPassword`, {...patterns.password})}
                className={classes[`${!errors.oldPassword ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}
              />
            </div>
            <div className={classes.input_error_wrapper}>
              <div className={classes.error_wrapper}>
                {errors.password && (
                  <><p className={classes.error}>{errors.password.message}</p></>
                )}
              </div>

              <input
                placeholder="Введите новый пароль"
                type="password"
                {...register(`password`, {...patterns.password})}
                className={classes[`${!errors.password ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}
              />
            </div>
            <div className={classes.input_error_wrapper}>
              <div className={classes.error_wrapper}>
                {repeatPassword !== watch(`password`) && (
                  <><p className={classes.error}>Пароли не совпадают</p></>
                )}
              </div>

              <input
                placeholder="Повторите новый пароль"
                type="password"
                {...register(`cPassword`)}
                className={classes[`${repeatPassword === watch(`password`) ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}
              />
            </div>

            <ButtonMui
              bc="#363636"
              text="Изменить пароль"
              coloring="white"
              padding="15px 24px"
              hb="#363636"
              fontSize="16px"
              type='submit'
              disabled={isValidPassword}
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
