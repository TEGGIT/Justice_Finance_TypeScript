import React from "react";


import {useForm} from "react-hook-form";

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
  const {users} = useTypedSelector((state) => state.user);
  const {FetchUser} = useActions();

  const changePassword = () => {

    reset({password: '', cPassword: '', oldPassword: ""})
  };
  const repeatPassword = watch(`cPassword`)


  const isValid =
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
              disabled=
                {
                  !watch(`name`)
                  &&
                  !watch(`email`)
                  &&
                  !watch(`city`)
                  &&
                  !watch(`birthday`)
                  &&
                  !watch(`phoneNumber`)
                }
              type="submit"
              fontSize="16px"
            />
          </form>
        </div>

        <div className={classes.main_wrapper__content}>
          <div className={classes.main_wrapper__content__title__info}>
            <p>Информация о вашей учетной записи</p>
          </div>
          <form className={classes.main_wrapper__content__input}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{position: 'relative', top: '-20px'}}>
                {errors.name && (
                  <><p style={{color: '#FF4D35', position: 'absolute'}}>{errors.name.message}</p></>
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
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{position: 'relative', top: '-20px'}}>
                {errors.email && (
                  <><p style={{position: 'absolute', color: '#FF4D35'}}>{errors.email.message}</p></>
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

            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{position: 'relative', top: '-20px'}}>
                {errors.city && (
                  <><p style={{color: '#FF4D35', position: 'absolute'}}>{errors.city.message}</p></>
                )}
              </div>

              <input
                placeholder="Город"
                className={classes[`${!errors.city ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}
                {...register(`city`, {...patterns.city})}
                defaultValue={users[0]?.city}
              />
            </div>
            <div style={{display: "flex", flexDirection: "column"}}>
              <div style={{position: 'relative', top: '-20px'}}>
                {errors.birthday && (
                  <p style={{color: '#FF4D35', position: 'absolute'}}>
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
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{position: 'relative', top: '-20px'}}>
                {errors.phoneNumber && (
                  <>
                    <p style={{position: "absolute", color: '#FF4D35',}}>{errors.phoneNumber.message}</p>
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
                disabled=
                  {
                    !watch(`name`)
                    &&
                    !watch(`email`)
                    &&
                    !watch(`city`)
                    &&
                    !watch(`birthday`)
                    &&
                    !watch(`phoneNumber`)
                  }
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
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{position: 'relative', top: '-20px'}}>
                {errors.oldPassword && (
                  <p style={{position: 'absolute', color: '#FF4D35'}}>{errors.oldPassword.message}</p>
                )}
              </div>

              <input
                placeholder="Введите старый пароль"
                type="password"
                {...register(`oldPassword`, {...patterns.password})}
                className={classes[`${!errors.oldPassword ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}
              />
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{position: 'relative', top: '-20px'}}>
                {errors.password && (
                  <><p style={{position: 'absolute', color: '#FF4D35'}}>{errors.password.message}</p></>
                )}
              </div>

              <input
                placeholder="Введите новый пароль"
                type="password"
                {...register(`password`, {
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
                    message: 'Неправильный формат пароля'
                  }
                })}
                className={classes[`${!errors.password ? (`main_wrapper__content__input_input`) : (`main_wrapper__content__input_input_error`)}`]}
              />
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{position: 'relative', top: '-20px'}}>
                {repeatPassword !== watch(`password`) && (
                  <><p style={{position: "absolute", color: '#FF4D35'}}>Пароли не совпадают</p></>
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
              disabled={isValid}
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
