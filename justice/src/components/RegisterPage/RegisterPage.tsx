import React, {useState} from "react";


import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";

import {Formik} from "formik";

import * as yup from "yup";

import axios from "axios";

import Input from "../UI/Input/Input";
import CheckBox from "../UI/CheckBox/CheckBox";
import ButtonMui from "../MUI/Button/ButtonMui";


import classes from "./RegisterPage.module.scss";
import image from "../../assets/image/IllustrationTwo.svg";
import google from "../../assets/image/google.svg";
import github from "../../assets/image/github.svg";

interface InitialValues {
  name: string,
  email: string,
  password: string,
  confirmPassword?: string
}

const RegisterPage = () => {

  const validationsSchema = yup.object().shape({
    name: yup.string()
      .required("Обязательно")
      // .typeError("Должно быть строкой")
      .matches(/^[а-яА-ЯЁё]+$/, 'Введено некорректное значение')    // .min(6, "Символ")
      .max(20, "Дохера"),

    password: yup
      .string()
      .typeError("Должно быть паролем")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/, "Это не пароль")
      .required("Обязательно"),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref(`password`)], "Нет совпадений")
      .required("Обязательно"),
    email: yup.string().typeError("Ошибка email").required("Обязательно").email(`Это не email`)
  });

  const [checked, setChecked] = React.useState<boolean>(false);
  const [isExistingUser, setIsExistingUser] = useState<boolean>(false)

  const navigate = useNavigate();

  const registration = (name: string, email: string, password: string) => {
    const submitValue = {name, email, password}
    axios.post("http://localhost:5000/api/auth/register-page", {
      name: submitValue.name,
      email: submitValue.email,
      password: submitValue.password,
    }).then(() => {
      navigate("/login-page", {replace: true});

    }).catch(function () {
      setIsExistingUser(true)
    });
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
              <div className={classes.line}/>
              <p className={classes.line__text}>Or</p>
              <div className={classes.line}/>
            </div>
            <div className={classes.input_wrapper}>
              <Formik<InitialValues>

                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}

                onSubmit={(values) => {
                  delete values.confirmPassword
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
                      <div style={{position: "relative"}}>
                        {touched.name && errors.name &&
                          <p style={{position: "absolute", color: '#FF4D35'}}>{errors.name}</p>}
                      </div>
                      <Input
                        className={classes[`${touched.name && errors.name ? (`input_error`) : (`input`)}`]}
                        name={`name`}
                        placeholder="Имя, Фамилия"
                        type={`text`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                      <div style={{position: "relative"}}>
                        {touched.email && errors.email &&
                          <p style={{position: "absolute", color: '#FF4D35'}}>{errors.email}</p>}
                      </div>

                      {!isExistingUser ? (
                        <Input
                          placeholder="E-mail"
                          name={`email`}
                          className={classes[`${touched.email && errors.email ? (`input_error`) : (`input`)}`]}
                          type={`email`}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      ) : (
                        <>
                          <div style={{position: "relative"}}>
                            <p style={{position: 'absolute', color: '#FF4D35'}}>Пользователь с таким Email уже
                              существует</p>
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

                        </>
                      )}

                    </div>
                    <div style={{position: "relative"}}>
                      {touched.password && errors.password &&
                        <p style={{position: "absolute", color: '#FF4D35'}}>{errors.password}</p>}
                    </div>
                    <div className={classes.input_wrapper_password}>
                      <Input
                        className={classes[`${touched.password && errors.password ? (`input_error`) : (`input`)}`]}
                        name={`password`}
                        placeholder="Пароль"
                        type={`password`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <>

                        <div style={{position: 'relative'}}>
                          {touched.confirmPassword && errors.confirmPassword && (
                            <p style={{
                              color: '#FF4D35',
                              position: "absolute",
                              top: "-20px"
                            }}>{errors.confirmPassword}</p>
                          )}
                          <Input
                            className={classes[`${touched.confirmPassword && errors.confirmPassword ? (`input_error`) : (`input`)}`]}
                            name={`confirmPassword`}
                            placeholder="Подтвердите пароль"
                            type={`password`}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                          />
                        </div>
                      </>
                    </div>
                    <div className={classes.checkbox}>
                      <CheckBox
                        onChange={(e) => setChecked(e.target.checked)}
                        checked={checked}
                      />

                      <p>
                        i accept the Terms of Service and have read Privacy Policy
                      </p>
                    </div>
                    <div className={classes.desktop_button}>
                      <ButtonMui
                        text="Зарегистрироваться"
                        padding="12px 180px"
                        bc="#363636"
                        coloring="#FFFFFF"
                        onClick={() => registration(values.name, values.email, values.password)}
                        disabled={!isValid || !checked || !dirty}
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
                        onClick={() => registration(values.name, values.email, values.password)}
                        type={`submit`}
                        disabled={!isValid || !checked || !dirty}
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
          <img src={image} alt="Register"/>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
