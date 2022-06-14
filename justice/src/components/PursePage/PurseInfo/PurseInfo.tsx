import React, {useState, useEffect} from "react";

import {NavLink, useLocation, useNavigate} from "react-router-dom";

import {useForm} from "react-hook-form";

import NavBar from "../../NavBar/NavBar";
import ProfileBar from "../../ProfileBar/ProfileBar";
import ButtonMui from "../../MUI/Button/ButtonMui";
import Wallet from "../../ProfileBar/WalletBar/Wallet";

import axios from "axios";
import Cookies from "js-cookie";

import classes from "./PurseInfo.module.scss";

import arrowBack from "../../../assets/image/Back.svg";
import banner from "../../../assets/image/Banner.png";
import walletIconSum from "../../../assets/image/WalletsSum.svg";
import {useTypedSelector} from "../../../hooks/useTypesSelector";
import {WalletsType} from "../../../store/reducers/WalletsReducer";
import Modal from "../../UI/Modal/Modal";

type Inputs = {
  sum: number | '';
  cardNumber: number | '';
  date: string;
  cvc: number | '';
  cardOrder: string;


};
const PurseInfo = () => {
  const {register, handleSubmit, reset, watch, formState: {errors}} = useForm<Inputs>({mode: "onChange"});

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const {wallets} = useTypedSelector((state) => state.wallets);

  const currentWallet: WalletsType | undefined = wallets.find(
    (wallet) => `#${wallet.currency}` === location.hash
  );

  const deleteWallet = () => {
    const newWallets =
      currentWallet &&
      wallets.filter((wallet) => wallet.currency !== currentWallet.currency);
    axios.patch("http://localhost:5000/api/wallets/remove", {
        wallets: newWallets,
      },
      {
        headers: {Authorization: `${Cookies.get("TOKEN")}`},
      }
    )
      .then(() => {
      });
    navigate("/purse-page", {replace: true});
  };


  return (
    <main className={classes.main}>
      <NavBar/>
      <section className={classes.main_wrapper}>
        <div className={classes.main_wrapper__title}>
          <div className={classes.main_wrapper__title_purse_id}>
            <NavLink to="/purse-page">
              <img src={arrowBack} alt="Назад"/>
            </NavLink>
            <h1 className={classes.main_wrapper__title_text}>
              {`${currentWallet?.currency}`}
            </h1>
            <span className={classes.main_wrapper__title_text_number}>
              {`#${currentWallet?.purseNumber}`}
            </span>
          </div>
          <ButtonMui
            text="Удалить кошелёк"
            padding="12px"
            border="1px solid #363636"
            bc="#FFFFFF"
            hb="#FFFFFF"
            coloring="#363636"
            fontSize="12px"
            fontWeight="600"
            onClick={deleteWallet}
          />
        </div>
        <div className={classes.main_wrapper__purse}>
          {currentWallet?.currency && (
            <Wallet
              countryName={currentWallet.currency}
              country={currentWallet?.currency}
              count={currentWallet?.sum.toFixed(2)}
              countryCounter={currentWallet?.currency}
            />
          )}
          <img src={banner} alt="баннер"/>
        </div>
        <div className={classes.main_wrapper__replenishment}>
          <p className={classes.main_wrapper__replenishment_text}>Пополнение</p>
          <form className={classes.main_wrapper__replenishment_wrapper} onSubmit={handleSubmit((data) => {
            const newWalletStorage = wallets?.map((wallet) => {
              if (wallet.currency === currentWallet?.currency)
                wallet.sum = +Number(currentWallet?.sum) + +Number(data.sum);
              setOpenModal(true);
              reset({sum: '', cvc: '', cardNumber: '', cardOrder: '', date: ""})
              return wallet;
            });

            axios
              .patch(
                "http://localhost:5000/api/wallets/update",
                {
                  wallets: [...newWalletStorage],
                },
                {
                  headers: {Authorization: `${Cookies.get("TOKEN")}`},
                }
              )
              .then(() => {
              });
          })}>
            <div style={{display: "flex", flexDirection: 'column'}}>
              <div style={{position: "relative", top: '-20px'}}>
                {errors.sum && (
                  <><p style={{position: 'absolute', color: '#FF4D35'}}>{errors.sum.message}</p></>
                )}
              </div>

              <input
                placeholder="Сумма"
                type="number"
                {...register(`sum`, {
                  maxLength: {
                    value: 6,
                    message: 'Лимит пополнения суммы 100000'
                  },
                  required: {
                    value: true,
                    message: "Обязательно"
                  }
                })}
                className={classes[`${!errors.sum ? (`main_wrapper__replenishment_wrapper_input`) : (`main_wrapper__replenishment_wrapper_input_error`)}`]}
              />
            </div>

            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{position: 'relative', top: '-20px'}}>
                {errors.cardNumber && (
                  <><p style={{position: 'absolute', color: '#FF4D35'}}>{errors.cardNumber.message}</p></>
                )}
              </div>
              <input
                {...register(`cardNumber`, {
                  minLength: {
                    value: 16,
                    message: 'Номер банковской карты введен некорректно'
                  },
                  required: {
                    value: true,
                    message: "Обязательно"
                  }
                })}
                placeholder="Номер карты"
                type="number"
                className={classes[`${!errors.cardNumber ? (`main_wrapper__replenishment_wrapper_input`) : (`main_wrapper__replenishment_wrapper_input_error`)}`]}
              />
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{position: 'relative', top: '-20px'}}>
                {errors.date && (
                  <p style={{position: 'absolute', color: "#FF4D35"}}>{errors.date.message}</p>
                )}
              </div>

              <input
                {...register(`date`, {
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                    message: "Ошибка в вводе данных"
                  },
                  required: {
                    value: true,
                    message: "Обязательно"
                  }
                })}
                placeholder="Даты"
                className={classes[`${!errors.date ? (`main_wrapper__replenishment_wrapper_input`) : (`main_wrapper__replenishment_wrapper_input_error`)}`]}

              />
            </div>

            <div style={{display: "flex", flexDirection: 'column'}}>
              <div style={{position: 'relative', top: "-20px"}}>
                {errors.cvc && (
                  <p style={{position: 'absolute', color: "#FF4D35"}}>{errors.cvc.message}</p>
                )}
              </div>

              <input
                {...register('cvc', {
                  minLength: {
                    value: 3,
                    message: "Минимум 3 символа"
                  },
                  maxLength: {
                    value: 3,
                    message: 'Максимум 3 символа'
                  },
                  required: {
                    value: true,
                    message: "Обязательно"
                  }
                })}
                placeholder="CVC"
                type="number"
                className={classes[`${!errors.cvc ? (`main_wrapper__replenishment_wrapper_input`) : (`main_wrapper__replenishment_wrapper_input_error`)}`]}
              />
            </div>

            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div style={{position: "relative", top: '-20px'}}>
                {errors.cardOrder && (
                  <p style={{position: "absolute", color: '#FF4D35'}}>{errors.cardOrder.message}</p>
                )}
              </div>

              <input
                {...register(`cardOrder`, {
                  pattern: {
                    value: /(?<! )[a-zA-Z' ]{4,26}$/g,
                    message: 'Введено некорректное значение'
                  },
                  required: {
                    value: true,
                    message: "Обязательно"
                  }
                })}
                placeholder="Владелец карты"
                type="text"
                className={classes[`${!errors.cardOrder ? (`main_wrapper__replenishment_wrapper_input`) : (`main_wrapper__replenishment_wrapper_input_error`)}`]}
              />
            </div>

            <ButtonMui
              text="Пополнить кошелек"
              padding="15px 24px"
              bc="#363636"
              disabled={Boolean(errors.sum || errors.cvc || errors.date || errors.cardNumber || errors.cardOrder
                ||
                !watch(`sum`) || !watch(`cvc`) || !watch(`date`) || !watch(`cardNumber`) || !watch(`cardOrder`))}
              hb="#363636"
              type='submit'
              coloring="#FFFFFF"
              fontSize="16px"
              fontWeight="600"
            />
          </form>
        </div>
      </section>
      <ProfileBar/>
      {openModal && openModal && (
        <Modal
          setOpenModal={setOpenModal}
          image={walletIconSum}
          textMain="Пополнение прошло успешно"
          textBottom="Вы успешно пополнили свой кошелек."
        />
      )}
    </main>
  );
};

export default PurseInfo;
