import React, {useEffect, useState} from "react";


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
    name: string;
    email: string;
    city: string;
    birthday: string;
    phoneNumber: number;
    oldPassword: string;
    password:string;

};

const Profile = () => {
    const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>({mode: "onChange"});
    const {users} = useTypedSelector((state) => state.user);
    const {FetchUser} = useActions();

    const changePassword = () => {

    };
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
                            className={classes.main_wrapper__content__input_input}
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
                            {...register(`email`)}

                            placeholder="Email"
                            type="email"
                            defaultValue={users[0]?.email}
                            className={classes.main_wrapper__content__input_input}
                        />

                        <input

                            placeholder="Город"
                            className={classes.main_wrapper__content__input_input}
                            {...register(`city`)}
                            defaultValue={users[0]?.city}


                        />

                        <input
                            placeholder="Дата рождения"
                            {...register(`birthday`)}
                            defaultValue={users[0]?.birthday}
                            className={classes.main_wrapper__content__input_input}
                        />

                        <input
                            placeholder="Номер телефона"
                            className={classes.main_wrapper__content__input_input}
                            {...register(`phoneNumber`, {minLength: {value: 11, message: 'Это не номер телефона'}})}
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
                        console.log(watch(`oldPassword`))

                        axios.patch(
                            "http://localhost:5000/api/profile/changePassword", {
                                password: watch(`oldPassword`),
                                newPassword: watch(`password`),
                            },
                            {headers: {Authorization: `${Cookies.get("TOKEN")}`}}
                        )
                            .then(() => {
                                FetchUser();
                            }).catch(function () {
                            }
                        );
                    })}>

                        <Input
                            placeholder="Введите старый пароль"
                            type="password"
                            {...register(`oldPassword`)}
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
                            {...register(`password`)}

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
                            type='submit'
                            // disabled={isDisabledPassword}
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
