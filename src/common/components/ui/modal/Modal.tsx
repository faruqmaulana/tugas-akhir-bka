/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import ReactDOM from "react-dom";

import style from "~/styles/ui/Modal.module.scss";
import { type ModalProps } from "~/common/models/types/ModalProps";
import { Button } from "../button/Button";
import Spinner from "../../svg/Spinner";
import XmarkIcon from "../../svg/XmarkIcon";

const Modal = (props: ModalProps) => {
  const {
    buttonCenter = false,
    buttonForm = "",
    confirm,
    content = null,
    contentCenter = false,
    captionButtonClose = "Close",
    captionButtonConfirm = "OK",
    captionButtonDanger = "Delete",
    captionButtonSuccess = "Simpan",
    captionTitleConfirm = "Apakah anda yakin?",
    disabledButtonSuccess = false,
    disabledButtonDanger = false,
    disabledButtonConfirm = false,
    disabledButtonClose = false,
    isOpen = false,
    isButtonSubmit = false,
    isLoading = false,
    modalFit = false,
    modalLarge = false,
    modalScroll = false,
    onClose,
    onCloseButton,
    onConfirmButton,
    onDangerButton,
    onSuccessButton,
    showTitle = true,
    showClose = true,
    showButtonClose = false,
    showButtonConfirm = false,
    showButtonDanger = false,
    showButtonSuccess = false,
    title = "",
    titleCenter = false,
    loaderIcon = <Spinner />,
  } = props;

  const buttonClose = (
    <Button
      className="flex w-full max-w-[120px] justify-center py-2"
      isDisabled={disabledButtonClose || isLoading}
      isGray
      onClick={onCloseButton}
    >
      {captionButtonClose}
    </Button>
  );

  const buttonConfirm = (
    <Button
      className="flex w-full max-w-[120px] justify-center py-2"
      isDisabled={disabledButtonConfirm || isLoading}
      isPrimary
      onClick={onConfirmButton}
    >
      {isLoading ? loaderIcon : captionButtonConfirm}
    </Button>
  );

  const buttonDanger = (
    <Button
      buttonForm={buttonForm}
      className="flex w-full max-w-[120px] justify-center py-2"
      isDisabled={disabledButtonDanger || isLoading}
      isDanger
      isSubmit={isButtonSubmit}
      onClick={onDangerButton}
    >
      {isLoading ? <Spinner /> : captionButtonDanger}
    </Button>
  );

  const buttonSuccess = (
    <Button
      buttonForm={buttonForm}
      className="flex w-full max-w-[120px] justify-center py-2"
      isDisabled={disabledButtonSuccess || isLoading}
      isSuccess
      isMedium
      isSubmit={isButtonSubmit}
      onClick={onSuccessButton}
    >
      {isLoading ? loaderIcon : captionButtonSuccess}
    </Button>
  );

  const closeIcon = (
    <button
      type="button"
      className="modal-close absolute right-0 z-50 cursor-pointer"
      onClick={onClose}
    >
      <XmarkIcon />
    </button>
  );

  const modal = (
    <div className={`${style.main}`} style={{ background: "rgba(0,0,0,.7)" }}>
      <div
        className={`${style.modalContainer} ${style.animated} ${style.faster} ${
          style.fadeIn
        } ${modalLarge && style.modalLarge} ${modalFit && style.modalFit}`}
      >
        <div className={style.content}>
          <div
            className={`relative flex ${
              !titleCenter ? "justify-start" : "justify-center"
            }  items-center`}
          >
            <div className="flex items-center justify-center">
              {showTitle && <p className={style.title}>{title}</p>}
            </div>
            {showClose && !isLoading && closeIcon}
          </div>
          <div
            className={`my-5 mb-8 
              ${contentCenter && "text-center"} 
              ${modalScroll && style.scrollableTable}`}
          >
            {content}
          </div>
          <div className={`flex justify-end gap-4`}>
            {showButtonConfirm && buttonConfirm}
            {showButtonDanger && buttonDanger}
            {showButtonSuccess && buttonSuccess}
            {showButtonClose && buttonClose}
          </div>
        </div>
      </div>
    </div>
  );

  return isOpen ? ReactDOM.createPortal(modal, document.body) : null;
};

export default Modal;
