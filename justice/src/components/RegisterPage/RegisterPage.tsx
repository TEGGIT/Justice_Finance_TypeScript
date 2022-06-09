import React, {useEffect, useState} from "react";

import {NavLink} from "react-router-dom";
import {useNavigate} from "react-router-dom";

import {Formik} from "formik";
import * as yup from 'yup'

import axios from "axios";

import Input from "../UI/Input/Input";
import CheckBox from "../UI/CheckBox/CheckBox";
import ButtonMui from "../MUI/Button/ButtonMui";

import classes from "./RegisterPage.module.scss";
import image from "../../assets/image/IllustrationTwo.svg";
import google from "../../assets/image/google.svg";
import github from "../../assets/image/github.svg";

const RegisterPage = () => {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);

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
              <div className={classes.line}/>
              <p className={classes.line__text}>Or</p>
              <div className={classes.line}/>
            </div>
            <div className={classes.input_wrapper}>
              <Formik initialValues={{
                name: '',
                email: '',
                password: '',
                repeatPassword: ''
              }} onSubmit={(values) => {
                console.log(values)
              }}>
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    isValid,
                    handleSubmit,
                    dirty
                  }) => (
                  <>
                    <p>
                      
                    </p>
                  </>
                )}

              </Formik>
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
