import React from 'react';


import classes from './Modal.module.scss'

import close from '../../../assets/image/Close.svg'


interface ModalInterface {
  setOpenModal: (e: boolean) => void;
  image?: string;
  textMain?: string;
  textBottom?: string
}

const Modal = ({setOpenModal, image, textMain, textBottom}: ModalInterface) => {
  const closeModal = () => setOpenModal(false)

  return (
    <div>
      <div className={classes.background} onClick={closeModal}>
        <div
          className={classes.background__card}
          onClick={(e) => e.stopPropagation()}
        >
          <img src={close} alt='закрыть' className={classes.img} onClick={closeModal}/>
          <div className={classes.modal_wrapper}>
            <div className={classes.modal_wrapper__content}>
              <img src={image}/>
              <p className={classes.modal_wrapper__content_text_main}>
                {textMain}
              </p>
              <p className={classes.modal_wrapper__content_text_bottom}>{textBottom}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;