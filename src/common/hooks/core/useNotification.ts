/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";

import {
  CREATE_SUCCESS,
  DELETE_SUCCESS,
  UPDATE_SUCCESS,
} from "~/common/constants/MESSAGE";
import {
  DEFAULT_BUTTON_CONFRIM,
  DEFAULT_MODAL_BUTTON_ACTION,
  INITIAL_MODAL_BUTTON,
} from "~/common/constants/ui/BUTTON";
import { useHeadingTitle } from "~/common/hooks/useHeading";

export type ModalStateType = {
  isOpen: boolean;
  confirm: boolean;
  content?: string;
  isAddData?: boolean;
  success: boolean;
  showContent?: boolean;
  titleContent?: string;
  successContent?: string;
  captionTitleConfirm?: string;
  showButtonSuccess: boolean;
  showButtonConfirm: boolean;
  showButtonClose: boolean;
  showButtonDanger: boolean;
  captionButtonDanger?: string;
  detailInfo?: string;
};

const INITIAL_STATE = {
  isOpen: false,
  confirm: false,
  success: false,
  showContent: true,
  content: undefined,
  titleContent: "",
  successContent: "",
  captionTitleConfirm: "",
  showButtonSuccess: false,
  showButtonConfirm: false,
  showButtonClose: false,
  showButtonDanger: false,
  captionButtonDanger: "",
  detailInfo: undefined,
};

const useNotification = () => {
  const [modalState, setModalState] = useState<ModalStateType>(INITIAL_STATE);

  const {
    isOpen,
    confirm,
    content,
    success,
    titleContent,
    successContent,
    showContent,
    captionTitleConfirm,
    showButtonSuccess,
    showButtonConfirm,
    showButtonClose,
    showButtonDanger,
    captionButtonDanger,
    detailInfo,
  } = modalState;

  const onClose = () => {
    setModalState(INITIAL_STATE);
  };

  const onOpen = ({
    titleContent,
    content,
    showContent,
    captionButtonDanger,
    detailInfo,
  }: {
    titleContent?: string;
    content?: string;
    showContent?: boolean;
    captionButtonDanger?: string;
    detailInfo?: string;
  }) => {
    setModalState({
      ...modalState,
      captionTitleConfirm: titleContent,
      titleContent,
      isOpen: true,
      confirm: true,
      showButtonDanger: true,
      showButtonClose: true,
      successContent: content,
      showContent,
      captionButtonDanger: captionButtonDanger,
      detailInfo,
    });
  };

  const onSubmit = () => {
    setModalState({
      ...modalState,
      isOpen: false,
      showContent: true,
      detailInfo: undefined,
    });

    setTimeout(() => {
      setModalState({
        ...modalState,
        ...INITIAL_MODAL_BUTTON,
        isOpen: true,
        success: true,
        detailInfo: undefined,
        showButtonConfirm: true,
        content: successContent,
      });
    }, 500);
  };

  return {
    isOpen,
    titleContent,
    confirm,
    content,
    success,
    onClose,
    onOpen,
    onSubmit,
    showContent,
    captionTitleConfirm,
    showButtonSuccess,
    showButtonConfirm,
    showButtonClose,
    showButtonDanger,
    captionButtonDanger,
    detailInfo,
  };
};

export { useNotification };
