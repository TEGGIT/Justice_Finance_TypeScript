import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Formik } from "formik";

import * as yup from "yup";

import axios from "axios";

import Input from "../UI/Input/Input";
import CheckBox from "../UI/CheckBox/CheckBox";
import ButtonMui from "../MUI/Button/ButtonMui";

import classes from "./RegisterPage.module.scss";
import image from "../../assets/image/IllustrationTwo.svg";
import google from "../../assets/image/google.svg";
import github from "../../assets/image/github.svg";

const RegisterPage = () => {
  const validationsSchema = yup.object().shape({
    name: yup.string().typeError("Должно быть строкой").required("Обязательно"),
    password: yup
      .string()
      .typeError("Должно быть паролем")
      .required("Обязательно"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref(`password`)], "Нет совпадений")
      .required("Обязательно"),
  });

  const [checked, setChecked] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const registration = () => {
    // axios.post("http://localhost:5000/api/auth/register-page", {
    //   name: name,
    //   email: email,
    //   password: password,
    // }).then(() => {
    //   navigate("/login-page", {replace: true});
    //
    // }).catch(function () {
    //   setEmailError(true)
    // });
  };

  return (
    <main className={classes.main}>
      <div className={classes.main__register}>
        <div className={classes.main__register_wrapper}>
          <div className={classes.main__register_wrapper__form}>
            <p className={classes.main__register_wrapper__form_text}>
              Регистрация
            </p>
            <div className={classes.main__register_wrapper__form__buttons}>
              <div className={classes.desktopTop_button}>
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
              <div className={classes.mobileTop_button}>
                <ButtonMui
                  fontSize="9px"
                  icon={google}
                  text="Sing up with Google"
                  gap="4px"
                  coloring="#363636"
                  border="1px solid #ECECEC"
                  padding="12px 12px 12px 12px"
                  fontWeight="500"
                />

                <ButtonMui
                  fontSize="9px"
                  icon={github}
                  text="Sing up with GitHub"
                  gap="4px"
                  coloring="#363636"
                  border="1px solid #ECECEC"
                  padding="12px 12px 12px 12px"
                  fontWeight="500"
                />
              </div>
            </div>
            <div></div>
            <div className={classes.line_wrapper}>
              <div className={classes.line} />
              <p className={classes.line__text}>Or</p>
              <div className={classes.line} />
            </div>
            <div className={classes.input_wrapper}>
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
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
                  handleSubmit,
                  dirty,
                }) => (
                  <>
                    <div className={classes.input_wrapper}>
                      {touched.name && errors.name && <p>{errors.name}</p>}
                      <Input
                        className={classes.input}
                        name={`name`}
                        placeholder="Имя, Фамилия"
                        type={`text`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                    </div>
                    {touched.password && errors.password && (
                      <p>{errors.password}</p>
                    )}
                    <div className={classes.input_wrapper_password}>
                      <Input
                        className={classes.input}
                        name={`password`}
                        placeholder="Пароль"
                        type={`password`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <p>{errors.confirmPassword}</p>
                      )}

                      <Input
                        className={classes.input}
                        name={`confirmPassword`}
                        placeholder="Подтвердите пароль"
                        type={`password`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                      />
                    </div>
                    <div className={classes.desktop_button}>
                      <ButtonMui
                        text="Зарегистрироваться"
                        padding="12px 180px"
                        bc="#363636"
                        coloring="#FFFFFF"
                        onClick={() => registration()}
                        disabled={!isValid && !dirty}
                        fontWeight="600"
                        hb="#363636"
                        fontSize="16px"
                      />
                    </div>
                    <div className={classes.mobile_button}>
                      <ButtonMui
                        text="Зарегистрироваться"
                        padding="12px 80px"
                        bc="#363636"
                        coloring="#FFFFFF"
                        onClick={handleSubmit}
                        type={`submit`}
                        disabled={!isValid && !dirty}
                        fontWeight="600"
                        hb="#363636"
                        fontSize="16px"
                      />
                    </div>
                  </>
                )}
              </Formik>
              <div className={classes.newPerson}>
                <p>
                  {" "}
                  У вас уже есть учетная запись?{" "}
                  <NavLink to="/login-page" className={classes.signup}>
                    Авторизоваться
                  </NavLink>
                </p>
              </div>
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
          <img src={image} alt="Register" />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
