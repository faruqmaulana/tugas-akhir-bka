/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import ReactDOM from "react-dom";

import style from "~/styles/ui/Modal.module.scss";
import { type ModalProps } from "~/common/models/types/ModalProps";
import { Button } from "../button/Button";
import Spinner from "../../svg/Spinner";
import XmarkIcon from "../../svg/XmarkIcon";
import SuccessIcon from "../../svg/SuccessIcon";
import ErrorIcon from "../../svg/ErrorIcon";
import ExclamationIcon from "../../svg/ExclamationIcon";

const Modal = (props: ModalProps) => {
  const {
    buttonCenter = false,
    buttonForm = "",
    confirm,
    content = null,
    contentCenter = false,
    captionButtonClose = "Cancel",
    captionButtonConfirm = "OK",
    captionButtonDanger = "Delete",
    captionButtonSuccess = "Save",
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
    success = false,
    error = false,
    title = "",
    titleCenter = false,
    loaderIcon = <Spinner />,
  } = props;

  const successContent = (
    <div className="mb-5 flex flex-col items-center justify-center">
      <SuccessIcon />
      <h1 className="text-3xl text-charcoal-900">Success!</h1>
    </div>
  );

  const errorContent = (
    <div className="mb-5 flex flex-col items-center justify-center">
      <ErrorIcon />
      <h1 className="text-3xl text-charcoal-900">Ooops!</h1>
    </div>
  );

  const confirmContent = (
    <div className="mb-5 flex flex-col items-center justify-center">
      <ExclamationIcon width="150px" height="150px" />
      <h1 className="text-3xl text-charcoal-900">{captionTitleConfirm}</h1>
    </div>
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
      buttonForm={buttonForm}
      className="flex w-full max-w-[120px] justify-center py-2"
      isDisabled={disabledButtonConfirm || isLoading}
      isPrimary
      isSubmit={isButtonSubmit}
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
      isSubmit={isButtonSubmit}
      onClick={onSuccessButton}
      isMedium
    >
      {isLoading ? loaderIcon : captionButtonSuccess}
    </Button>
  );

  const modal = (
    <div className={`${style.main}`} style={{ background: "rgba(0,0,0,.7)" }}>
      <div
        className={`${style.animated} ${style.faster} ${style.fadeIn} ${
          style.modalContainer
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
            {success && successContent}
            {error && errorContent}
            {confirm && confirmContent}
            {content}
          </div>
          <div
            className={`flex gap-4 ${
              buttonCenter ? "justify-center" : "justify-end"
            }`}
          >
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
