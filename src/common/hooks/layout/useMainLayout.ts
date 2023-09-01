/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect, useState } from "react";
import { useGlobalContext } from "~/common/context/GlobalContext";
import { ActionReducer } from "~/common/types/context/GlobalContextType";
import { type AllNotificationType } from "~/server/api/module/notification/notification";
import { type UserProfileType } from "~/server/queries/module/user/user.query";
import { api } from "~/utils/api";

const useMainLayout = () => {
  const { state, dispatch } = useGlobalContext();
  const [showAside, setShowAside] = useState<boolean>(true);
  const { data: user, isLoading } = api.user.getUserProfile.useQuery();
  const {
    data: userNotification,
    isLoading: loadingNotification,
    refetch: refetchNotification,
  } = api.notification.getUserNotif.useQuery();

  useEffect(() => {
    if (!isLoading && user && !loadingNotification && userNotification) {
      // UPDATE GLOBAL USER
      dispatch({
        type: ActionReducer.UPDATE_USER,
        payload: user as UserProfileType,
      });

      // UPDATE GLOBAL USER NOTIF COUNT
      dispatch({
        type: ActionReducer.UPDATE_NOTIFICATION_COUNT,
        payload: userNotification as AllNotificationType,
      });
    }
  }, [isLoading, user, loadingNotification, userNotification, dispatch]);

  const userData = state?.user;
  const userNotif = state?.notification;

  return { showAside, setShowAside, userData, userNotif, refetchNotification };
};

export { useMainLayout };
