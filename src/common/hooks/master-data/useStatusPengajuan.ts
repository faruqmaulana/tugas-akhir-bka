/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";

import {
  CREATE_SUCCESS,
  DELETE_SUCCESS,
  UPDATE_SUCCESS,
} from "~/common/constants/MESSAGE";
import {
  DEFAULT_MODAL_BUTTON_ACTION,
  INITIAL_MODAL_BUTTON,
} from "~/common/constants/ui/BUTTON";
import { useHeadingTitle } from "~/common/hooks/useHeading";

export type ModalStateType = {
  formData: any;
  isOpen: boolean;
  title: string;
  confirm: boolean;
  success: boolean;
  content?: string | null;
  isAddData?: boolean;
  createAction: boolean;
  updateAction: boolean;
  deleteAction: boolean;
  showButtonSuccess: boolean;
  showButtonConfirm: boolean;
  showButtonClose: boolean;
  showButtonDanger: boolean;
};

const INITIAL_STATE = {
  formData: [],
  isOpen: false,
  title: "",
  confirm: false,
  success: false,
  content: null,
  createAction: false,
  updateAction: false,
  deleteAction: false,
  showButtonSuccess: false,
  showButtonConfirm: false,
  showButtonClose: false,
  showButtonDanger: false,
};

const useStatusPengajuan = () => {
  const { moduleHeading } = useHeadingTitle();
  const [modalState, setModalState] = useState<ModalStateType>(INITIAL_STATE);

  const {
    isOpen,
    formData,
    title,
    confirm,
    success,
    content,
    createAction,
    updateAction,
    deleteAction,
    showButtonSuccess,
    showButtonConfirm,
    showButtonClose,
    showButtonDanger,
  } = modalState;

  const onClose = () => {
    setModalState(INITIAL_STATE);
  };

  const handleContent = (): string => {
    if (createAction) return CREATE_SUCCESS;
    if (updateAction) return UPDATE_SUCCESS;
    if (deleteAction) return DELETE_SUCCESS;
    return "";
  };

  const handleAdd = () => {
    setModalState({
      ...modalState,
      ...DEFAULT_MODAL_BUTTON_ACTION,
      isOpen: true,
      title: `Add ${moduleHeading as string}`,
      createAction: true,
    });
  };

  const handleEdit = (row: { [x: string]: any }, formData: any[]) => {
    const tempCopy = formData.map((item: { key: string | number }) => {
      const value = row[item.key];
      return {
        ...item,
        value,
      };
    });

    setModalState({
      ...modalState,
      ...DEFAULT_MODAL_BUTTON_ACTION,
      isOpen: true,
      formData: tempCopy,
      title: `Edit ${moduleHeading as string}`,
      updateAction: true,
    });
  };

  const handleDelete = (row: any) => {
    setModalState({
      ...modalState,
      showButtonClose: true,
      showButtonDanger: true,
      isOpen: true,
      confirm: true,
      deleteAction: true,
    });
  };

  const onSubmit = () => {
    setModalState({ ...modalState, isOpen: false });

    setTimeout(() => {
      setModalState({
        ...modalState,
        ...INITIAL_MODAL_BUTTON,
        isOpen: true,
        success: true,
        showButtonConfirm: true,
        content: handleContent(),
      });
    }, 500);
  };

  return {
    isOpen,
    formData,
    title,
    confirm,
    success,
    content,
    onClose,
    handleEdit,
    handleDelete,
    onSubmit,
    handleAdd,
    createAction,
    updateAction,
    deleteAction,
    showButtonSuccess,
    showButtonConfirm,
    showButtonClose,
    showButtonDanger,
  };
};

export { useStatusPengajuan };
