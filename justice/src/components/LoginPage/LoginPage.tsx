import React, {useState} from "react";


import {NavLink, useNavigate} from "react-router-dom";

import {useActions} from "../../hooks/useAction";


import Cookies from "js-cookie";

import axios from "axios";

import {Formik} from "formik";

import * as yup from "yup";

import ButtonMui from "../MUI/Button/ButtonMui";
import Input from "../UI/Input/Input";
import CheckBox from "../UI/CheckBox/CheckBox";

import classes from "./LoginPage.module.scss";

import image from "../../assets/image/IllustrationOne.svg";
import google from "../../assets/image/google.svg";
import github from "../../assets/image/github.svg";

interface InitialValues {
  email: string,
  password: string,
}

const LoginPage = () => {

  const validationsSchema = yup.object().shape({
    password: yup
      .string()
      .typeError("Должно быть паролем")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/, "Это не пароль")
      .required("Обязательно"),
    email: yup
      .string()
      .typeError("Ошибка email")
      .required("Обязательно")
      .email(`Это не email`)
  });


  const [checked, setChecked] = React.useState<boolean>(false);

  const [isNotExistingUser, setNotIsExistingUser] = useState<boolean>(false)

  const {loginUser} = useActions();

  const navigate = useNavigate();

  const checkUser = (email: string, password: string) => {
    axios.post("http://localhost:5000/api/auth/login-page", {
      email,
      password,
    }).then(res => {
      Cookies.set("TOKEN", res.data.token);
      console.log(res.data)
      loginUser(true)
      navigate("/exchange-rates-page", {replace: true});
    }).catch(function (e) {
      setNotIsExistingUser(true)
    })

  };


  const handleChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setChecked(event.target.checked);
  };

  return (
    <main className={classes.main}>
      <div className={classes.main__login}>
        <div className={classes.main__login_wrapper}>
          <div className={classes.main__login_wrapper__form}>
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
              <div className={classes.line}/>
              <p className={classes.line__text}>Or</p>
              <div className={classes.line}/>
            </div>
            <div className={classes.input_wrapper}>
              <Formik<InitialValues>

                initialValues={{
                  email: "",
                  password: "",
                }}

                onSubmit={(values) => {
                  console.log(values);
                }}
                validationSchema={validationsSchema}
              >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    isValid,
                    dirty,
                  }) => (
                  <>
                    <div className={classes.input_wrapper}>


                      {!isNotExistingUser ? (
                        <>
                          <div style={{position: "relative"}}>
                            {touched.email && errors.email && <p style={{position: "absolute"}}>{errors.email}</p>}
                          </div>
                          <Input
                            placeholder="E-mail"
                            name={`email`}
                            className={classes.input}
                            type={`email`}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <div style={{position: "relative"}}>
                            {touched.password && errors.password &&
                              <p style={{position: "absolute"}}>{errors.password}</p>}
                          </div>
                          <Input
                            className={classes.input}
                            name={`password`}
                            placeholder="Пароль"
                            type={`password`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />

                        </>
                      ) : (
                        <>
                          <div style={{position: "relative"}}>
                            <p style={{position: 'absolute'}}>Введите действующий адрес электронной почты и
                              пароль</p>
                          </div>
                          <Input
                            placeholder="E-mail"
                            name={`email`}
                            className={classes.input_error}
                            type={`email`}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <Input
                            className={classes.input_error}
                            name={`password`}
                            placeholder="Пароль"
                            type={`password`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />

                        </>
                      )}

                    </div>

                    <div className={classes.checkbox}>
                      <CheckBox onChange={handleChange} checked={checked}/>
                      <p>Запомнить меня</p>
                    </div>
                    <div className={classes.desktop_button}>
                      <ButtonMui
                        text="Войти"
                        padding="12px 195px"
                        bc="#363636"
                        coloring="#FFFFFF"
                        onClick={() => checkUser(values.email, values.password)}
                        disabled={!isValid || !dirty}
                        fontWeight="600"
                        hb="#363636"
                        fontSize="16px"
                      />
                    </div>
                    <div className={classes.mobile_button}>
                      <ButtonMui
                        text="Войти"
                        padding="12px 100px"
                        bc="#363636"
                        coloring="#FFFFFF"
                        onClick={() => checkUser(values.email, values.password)}
                        type={`submit`}
                        disabled={!isValid || !dirty}
                        fontWeight="600"
                        hb="#363636"
                        fontSize="16px"
                      />
                    </div>
                  </>
                )}
              </Formik>

            </div>
            <div className={classes.newPerson}>
              <p>
                Нет аккаунта?{" "}
                <NavLink to="/register-page" className={classes.signup}>
                  Создать аккаунт
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.main__image}>
        <NavLink to="/" className={classes.main__image_text}>
          <p className={classes.text_bold}>Justice</p>
          <p className={classes.text_regular}>Finance</p>
        </NavLink>
        <div className={classes.main__image_wrapper}>
          <img src={image} alt="SignUp"/>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
