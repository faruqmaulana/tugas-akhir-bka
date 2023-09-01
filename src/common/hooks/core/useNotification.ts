/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import { customToast } from "~/common/components/ui/toast/showToast";
import { DELETE_SUCCESS } from "~/common/constants/MESSAGE";

import { api } from "~/utils/api";

export type ModalStateType = {
  id: string | undefined;
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
  loadingButton: boolean;
};

const INITIAL_STATE = {
  id: undefined,
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
  loadingButton: false,
};

const useNotification = () => {
  const [modalState, setModalState] = useState<ModalStateType>(INITIAL_STATE);
  const { data: userNotification, refetch: refetchNotification } =
    api.notification.getUserNotif.useQuery();
  const { mutate: updateReadNotification } =
    api.notification.updateNotification.useMutation();

  const { mutate: deleteSingleNotification } =
    api.notification.deleteSingleNotification.useMutation();

  const {
    isOpen,
    confirm,
    content,
    success,
    titleContent,
    showContent,
    captionTitleConfirm,
    showButtonSuccess,
    showButtonConfirm,
    showButtonClose,
    showButtonDanger,
    captionButtonDanger,
    detailInfo,
    loadingButton
  } = modalState;

  const onClose = () => {
    setModalState(INITIAL_STATE);
  };

  const onOpen = ({
    id,
    titleContent,
    content,
    showContent,
    captionButtonDanger,
    detailInfo,
  }: {
    id: string | undefined;
    titleContent?: string;
    content?: string;
    showContent?: boolean;
    captionButtonDanger?: string;
    detailInfo?: string;
  }) => {
    setModalState({
      ...modalState,
      id: id,
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
      loadingButton: true,
    });
    handleDeleteNotification(modalState.id as string);
  };

  const handleReadMessage = (id: string) => {
    updateReadNotification(id, {
      onSuccess: () => {
        void refetchNotification();
      },
      onError: (error: { message: string | undefined }) => {
        customToast("error", error?.message);
      },
    });
  };

  const handleDeleteNotification = (id: string) => {
    deleteSingleNotification(id, {
      onSuccess: () => {
        void refetchNotification();
        setModalState({
          ...modalState,
          loadingButton: false,
          isOpen: false,
          showContent: true,
          detailInfo: undefined,
        });
        customToast("success", DELETE_SUCCESS);
      },
      onError: (error: { message: string | undefined }) => {
        customToast("error", error?.message);
        setModalState({
          ...modalState,
          loadingButton: false,
          isOpen: false,
          showContent: true,
          detailInfo: undefined,
        });
      },
    });
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
    userNotification,
    handleReadMessage,
    loadingButton
  };
};

export { useNotification };
