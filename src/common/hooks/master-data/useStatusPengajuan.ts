/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import { PENGAJUAN_FORM } from "~/common/components/ui/page/status-pengajuan/PENGAJUAN";
import { type StatusType } from "~/common/constants/MASTER-DATA/STATUS";
import { useHeadingTitle } from "~/common/hooks/useHeading";
import { UPDATE_SUCCESS } from "~/common/constants/MESSAGE";

export type ModalStateType = {
  formData: any;
  isOpen: boolean;
  title: string;
  confirm: boolean;
  success: boolean;
  content?: string | null;
  showButtonSuccess: boolean;
  isAddData?: boolean;
};

const INITIAL_STATE = {
  formData: [],
  isOpen: false,
  title: "",
  confirm: false,
  success: false,
  content: null,
  showButtonSuccess: false,
  isAddData: false,
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
    isAddData,
    showButtonSuccess,
  } = modalState;

  const onClose = () => {
    setModalState(INITIAL_STATE);
  };

  const onSubmit = () => {
    setModalState({ ...modalState, isOpen: false });

    setTimeout(() => {
      setModalState({
        ...modalState,
        isOpen: true,
        success: true,
        content: UPDATE_SUCCESS,
      });
    }, 500);
  };

  const handleAdd = () => {
    setModalState({
      ...modalState,
      isOpen: true,
      title: `Add ${moduleHeading as string}`,
      showButtonSuccess: true,
      isAddData: true,
    });
  };

  const handleEdit = (row: StatusType) => {
    const tempCopy = PENGAJUAN_FORM.map((item) => {
      const value = row[item.key];
      return {
        ...item,
        value,
      };
    });

    setModalState({
      ...modalState,
      isOpen: true,
      formData: tempCopy,
      title: `Edit ${moduleHeading as string}`,
      showButtonSuccess: true,
    });
  };

  const handleDelete = (row: StatusType) => {
    const { id } = row;
    setModalState({
      ...modalState,
      isOpen: true,
      confirm: true,
      showButtonSuccess: false,
    });
  };

  return {
    isOpen,
    formData,
    title,
    confirm,
    success,
    content,
    showButtonSuccess,
    isAddData,
    onClose,
    handleEdit,
    handleDelete,
    onSubmit,
    handleAdd,
  };
};

export { useStatusPengajuan };
