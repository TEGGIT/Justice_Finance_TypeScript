import React, {useState} from "react";

import {NavLink, useLocation, useNavigate} from "react-router-dom";

import {SubmitHandler, useForm} from "react-hook-form";

import NavBar from "../../NavBar/NavBar";
import ProfileBar from "../../ProfileBar/ProfileBar";
import ButtonMui from "../../MUI/Button/ButtonMui";
import Wallet from "../../ProfileBar/WalletBar/Wallet";


import classes from "./PurseInfo.module.scss";

import arrowBack from "../../../assets/image/Back.svg";
import banner from "../../../assets/image/Banner.png";
import walletIconSum from "../../../assets/image/WalletsSum.svg";
import {useTypedSelector} from "../../../hooks/useTypesSelector";
import {WalletsType} from "../../../store/reducers/WalletsReducer";
import Modal from "../../UI/Modal/Modal";
import {patterns} from "../../../patterns/patterns";
import {useActions} from "../../../hooks/useAction";

type Inputs = {
  sum: number | '';
  cardNumber: number | '';
  date: string;
  cvc: number | '';
  cardOrder: string | '';


};
const PurseInfo = () => {

  const {register, handleSubmit, reset, watch, formState: {errors}} = useForm<Inputs>({mode: "onChange"});

  const location = useLocation();

  const navigate = useNavigate();
  const {updateWalletUser, removeWalletUser} = useActions();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = data => (data);

  const {wallets} = useTypedSelector((state) => state.wallets);

  const currentWallet: WalletsType | undefined = wallets.find(
    (wallet) => `#${wallet.currency}` === location.hash
  );

  const deleteWallet = () => {
    const newWallets =
      currentWallet &&
      wallets.filter((wallet) => wallet.currency !== currentWallet.currency);
    //TODO пофиксить
    removeWalletUser(newWallets)

    navigate("/purse-page", {replace: true});
  };

  const sumWallet = Number(watch(`sum`))
  const addSumWallet = () => {
    const newWalletStorage = wallets?.map((wallet) => {
      if (wallet.currency === currentWallet?.currency)
        wallet.sum = +Number(currentWallet?.sum) + +sumWallet;
      setOpenModal(true);
      reset({sum: '', cvc: '', cardNumber: '', cardOrder: '', date: ""})
      return wallet;
    });
    //TODO пофиксить
    updateWalletUser([...newWalletStorage])
  }
  const isValue = Boolean(errors.sum || errors.cvc || errors.date || errors.cardNumber || errors.cardOrder
    ||
    !watch(`sum`) || !watch(`cvc`) || !watch(`date`) || !watch(`cardNumber`) || !watch(`cardOrder`))

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
          <div className={classes.image}>
            <img src={banner} alt="баннер"/>
          </div>
        </div>
        <div className={classes.main_wrapper__replenishment}>
          <p className={classes.main_wrapper__replenishment_text}>Пополнение</p>
          <form className={classes.main_wrapper__replenishment_wrapper} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.input_error_wrapper}>
              <div className={classes.error_wrapper}>
                {errors.sum && (
                  <p className={classes.error}>{errors.sum.message}</p>
                )}
              </div>

              <input
                placeholder="Сумма"
                type="number"
                {...register(`sum`, {...patterns.sum})}
                className={classes[`${!errors.sum ? (`main_wrapper__replenishment_wrapper_input`) : (`main_wrapper__replenishment_wrapper_input_error`)}`]}
              />
            </div>

            <div className={classes.input_error_wrapper}>
              <div className={classes.error_wrapper}>
                {errors.cardNumber && (
                  <p className={classes.error}>{errors.cardNumber.message}</p>
                )}
              </div>
              <input
                {...register(`cardNumber`, {...patterns.cardNumber})}
                placeholder="Номер карты"
                type="number"
                className={classes[`${!errors.cardNumber ? (`main_wrapper__replenishment_wrapper_input`) : (`main_wrapper__replenishment_wrapper_input_error`)}`]}
              />
            </div>
            <div className={classes.input_error_wrapper}>
              <div className={classes.error_wrapper}>
                {errors.date && (
                  <p className={classes.error}>{errors.date.message}</p>
                )}
              </div>

              <input
                {...register(`date`, {...patterns.date})}
                placeholder="Даты"
                className={classes[`${!errors.date ? (`main_wrapper__replenishment_wrapper_input`) : (`main_wrapper__replenishment_wrapper_input_error`)}`]}
              />
            </div>

            <div className={classes.input_error_wrapper}>
              <div className={classes.error_wrapper}>
                {errors.cvc && (
                  <p className={classes.error}>{errors.cvc.message}</p>
                )}
              </div>

              <input
                {...register('cvc', {...patterns.cvc})}
                placeholder="CVC"
                type="number"
                className={classes[`${!errors.cvc ? (`main_wrapper__replenishment_wrapper_input`) : (`main_wrapper__replenishment_wrapper_input_error`)}`]}
              />
            </div>

            <div className={classes.input_error_wrapper}>
              <div className={classes.error_wrapper}>
                {errors.cardOrder && (
                  <p className={classes.error}>{errors.cardOrder.message}</p>
                )}
              </div>

              <input
                {...register(`cardOrder`, {...patterns.cardOrder})}
                placeholder="Владелец карты"
                type="text"
                className={classes[`${!errors.cardOrder ? (`main_wrapper__replenishment_wrapper_input`) : (`main_wrapper__replenishment_wrapper_input_error`)}`]}
              />
            </div>
            <ButtonMui
              text="Пополнить кошелек"
              padding="15px 24px"
              bc="#363636"
              disabled={isValue}
              hb="#363636"
              type='submit'
              coloring="#FFFFFF"
              fontSize="16px"
              fontWeight="600"
              onClick={addSumWallet}
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
