import { type ReactNode } from "react";

export type ModalProps = {
  buttonCenter?: boolean;
  buttonForm?: string;
  captionButtonClose?: string | ReactNode;
  captionButtonConfirm?: string | ReactNode;
  captionButtonDanger?: string | ReactNode;
  captionButtonSuccess?: string | ReactNode;
  captionTitleConfirm?: string | ReactNode;
  confirm?: boolean;
  content: null | ReactNode;
  contentCenter?: boolean;
  disabledButtonConfirm?: boolean;
  disabledButtonDanger?: boolean;
  disabledButtonSuccess?: boolean;
  disabledButtonClose?: boolean;
  error?: boolean;
  isOpen: boolean;
  isLoading?: boolean;
  isButtonSubmit?: boolean;
  modalFit?: boolean;
  modalLarge?: boolean;
  modalScroll?: boolean;
  onClose?: () => void;
  onCloseButton?: () => void;
  onConfirmButton?: () => void;
  onDangerButton?: () => void;
  onSuccessButton?: () => void;
  setIsOpen?: () => void;
  showTitle?: boolean;
  showClose?: boolean;
  showButtonClose?: boolean;
  showButtonConfirm?: boolean;
  showButtonDanger?: boolean;
  showButtonSuccess?: boolean;
  success?: boolean;
  title?: string;
  titleCenter?: boolean;
  loaderIcon?: ReactNode;
  showIconModal?:boolean
  className?: string
};
