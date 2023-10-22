/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from "react";
import { customToast } from "~/common/components/ui/toast/showToast";

import {
  DATA_SUCCESSFULLY_DELETED,
  DELETE_ALL_MODULE,
  MODULE_NOTIFIKASI,
  UPDATE_ALL_MODULE,
} from "~/common/constants/MESSAGE";
import {
  type NotificationType,
  type AllNotificationType,
} from "~/server/api/module/notification/notification";

import { api } from "~/utils/api";
import { type KejuaraanByIdType } from "~/server/api/module/pengajuan/_router";
import { transformActivityLog } from "~/common/transforms/transformActiviryLog";

export enum NOTIFICATION_ACTION {
  DELETE_NOTIFICATION = "DELETE_NOTIFICATION",
  MARK_ALL_NOTIFICATION = "MARK_ALL_NOTIFICATION",
  DELETE_ALL_NOTIFICATION = "DELETE_ALL_NOTIFICATION",
}

export type getActionUserType = {
  data: NotificationType;
  id: string;
};

export type onOpenNotificationType = {
  id?: string | undefined;
  titleContent?: string;
  content?: string;
  showContent?: boolean;
  captionButtonDanger?: string;
  detailInfo?: string;
  action?:
    | "DELETE_NOTIFICATION"
    | "DELETE_ALL_NOTIFICATION"
    | "MARK_ALL_NOTIFICATION"
    | undefined;
};

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
  action?:
    | "DELETE_NOTIFICATION"
    | "DELETE_ALL_NOTIFICATION"
    | "MARK_ALL_NOTIFICATION"
    | undefined;
};

const INITIAL_STATE: ModalStateType = {
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
  action: undefined,
};

const useNotification = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const [currentActivityLogId, setCurrentActivityLogId] = useState<
    string | undefined
  >(undefined);
  const [activityLogId, setActivityLogId] = useState<string | undefined>(
    undefined
  );

  const [modalState, setModalState] = useState<ModalStateType>(INITIAL_STATE);
  const { data: userNotification, refetch: refetchNotification } =
    api.notification.getUserNotif.useQuery();
  const { mutate: updateReadNotification } =
    api.notification.updateNotification.useMutation();
  const { mutate: deleteSingleNotification } =
    api.notification.deleteSingleNotification.useMutation();
  const { mutate: actionToAllNotification } =
    api.notification.actionToAllNotification.useMutation();
  const {
    // mutate: getModuleActivityLog,
    data: getActivityLog,
    isLoading: isActivityLogLoading,
  } = api.activityLog.getModuleLogActivity.useQuery(
    { id: currentActivityLogId },
    { enabled: !!currentActivityLogId }
  );

  const activityLog = transformActivityLog(
    getActivityLog as KejuaraanByIdType["activityLog"]
  );

  const [loadingState, setLoadingState] = useState<{ isLoading: boolean }[]>(
    []
  );

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
    loadingButton,
  } = modalState;

  const onClose = () => {
    setModalState(INITIAL_STATE);
  };

  const onOpen = (props: onOpenNotificationType) => {
    const {
      id,
      titleContent,
      content,
      showContent,
      captionButtonDanger,
      detailInfo,
      action,
    } = props;

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
      action,
    });
  };

  const onSubmit = () => {
    setModalState({
      ...modalState,
      loadingButton: true,
    });

    if (modalState.action === NOTIFICATION_ACTION.MARK_ALL_NOTIFICATION) {
      actionToAllNotification(NOTIFICATION_ACTION.MARK_ALL_NOTIFICATION, {
        onSuccess: () => {
          void refetchNotification();
          customToast("success", UPDATE_ALL_MODULE(MODULE_NOTIFIKASI));
          setModalState(INITIAL_STATE);
        },
        onError: (error: { message: string | undefined }) => {
          customToast("error", error?.message);
          setModalState(INITIAL_STATE);
        },
      });
      return;
    }

    if (modalState.action === NOTIFICATION_ACTION.DELETE_ALL_NOTIFICATION) {
      actionToAllNotification(NOTIFICATION_ACTION.DELETE_ALL_NOTIFICATION, {
        onSuccess: () => {
          void refetchNotification();
          customToast("success", DELETE_ALL_MODULE(MODULE_NOTIFIKASI));
          setModalState(INITIAL_STATE);
        },
        onError: (error: { message: string | undefined }) => {
          customToast("error", error?.message);
          setModalState(INITIAL_STATE);
        },
      });
      return;
    }

    if (modalState.action === NOTIFICATION_ACTION.DELETE_NOTIFICATION) {
      handleDeleteNotification(modalState.id as string);
      return;
    }

    setModalState(INITIAL_STATE);
  };

  const handleReadMessage = (id: string, index: number) => {
    const tempLoading = [...loadingState];
    tempLoading[index]!.isLoading = !tempLoading[index]!.isLoading;
    setLoadingState(tempLoading);

    updateReadNotification(id, {
      onSuccess: () => {
        void refetchNotification();
        setTimeout(() => {
          tempLoading[index]!.isLoading = !tempLoading[index]!.isLoading;
          setLoadingState(tempLoading);
        }, 500);
      },
      onError: (error: { message: string | undefined }) => {
        customToast("error", error?.message);
        setLoadingState(tempLoading);
      },
    });
  };

  const handleDeleteNotification = (id: string) => {
    deleteSingleNotification(id, {
      onSuccess: () => {
        void refetchNotification();
        setTimeout(() => {
          setModalState(INITIAL_STATE);
          customToast("success", DATA_SUCCESSFULLY_DELETED);
        }, 500);
      },
      onError: (error: { message: string | undefined }) => {
        customToast("error", error?.message);
        setModalState(INITIAL_STATE);
      },
    });
  };

  const handleNotificationDrawer = (data: AllNotificationType[0]) => {
    console.log(data)
    const { activityLogId, notificationMessage } = data;
    const { moduleId } = notificationMessage;
    setIsDrawerOpen(true);
    setActivityLogId(activityLogId);
    setCurrentActivityLogId(moduleId);
  };

  useEffect(() => {
    if (userNotification) {
      setLoadingState(
        (userNotification as AllNotificationType).map((_val, index) => {
          return {
            isLoading: loadingState[index]?.isLoading || false,
          };
        })
      );
    }
  }, [userNotification]);

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
    loadingButton,
    loadingState,
    handleNotificationDrawer,
    isDrawerOpen,
    setIsDrawerOpen,
    activityLog,
    activityLogId,
    isActivityLogLoading,
  };
};

export { useNotification };
