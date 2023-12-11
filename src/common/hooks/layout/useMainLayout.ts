/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect, useState } from "react";
import { useGlobalContext } from "~/common/context/GlobalContext";
import { ActionReducer } from "~/common/types/context/GlobalContextType";
import { type AllNotificationType } from "~/server/api/module/notification/notification";
import { type UserProfileType } from "~/server/queries/module/user/user.query";
import { api } from "~/utils/api";
import { useWidthViewport } from "../core/useWidthViewport";
import { useCurrentUser } from "../module/profile";
import { customToast } from "~/common/components/ui/toast/showToast";
import { useSession } from "next-auth/react";

const useMainLayout = () => {
  const { viewportWidth } = useWidthViewport();
  const { state, dispatch } = useGlobalContext();
  const { isAdmin } = useCurrentUser();
  const [showAside, setShowAside] = useState<boolean>(true);
  const { data: session } = useSession();
  const [showBannerProfile, setShowBannerProfile] = useState<boolean>(false);
  const { data: user, isLoading } =
    api.user.getUserProfile.useQuery<UserProfileType>();
  const { mutate: updateUserBanner } =
    api.user.updateUserProfileBanner.useMutation();
  const { user: userState } = state;
  const userData = state?.user;
  const userNotif = state?.notification;
  const isProfileNotCompletelyFilled =
    !userState?.npm || !userState?.prodi || !userState?.semester;
  const displayBanner = session?.user && !isAdmin && userData && isProfileNotCompletelyFilled;

  const handleCloseBannerProfileHasFilled = () => {
    // uddate profile banner
    updateUserBanner(undefined, {
      onSuccess: (data) => {
        dispatch({
          type: ActionReducer.UPDATE_USER,
          payload: data.data as unknown as UserProfileType,
        });
      },
      onError: (error) => {
        customToast("error", error?.message);
      },
    });
    setShowBannerProfile(false);
  };

  useEffect(() => {
    if (
      typeof displayBanner === "boolean" &&
      displayBanner === false &&
      userState?.isBannerOpen &&
      !isAdmin
    ) {
      setShowBannerProfile(true);
    }

    if (!userState?.isBannerOpen) {
      setShowBannerProfile(false);
    }
  }, [displayBanner]);

  useEffect(() => {
    if (viewportWidth) {
      if (viewportWidth > 767) {
        setShowAside(true);
      } else {
        setShowAside(false);
      }
    }
  }, [viewportWidth]);

  const {
    data: userNotification,
    isLoading: loadingNotification,
    refetch: refetchNotification,
  } = api.notification.getUserNotif.useQuery<AllNotificationType>();

  useEffect(() => {
    if (!isLoading && user) {
      // UPDATE GLOBAL USER
      dispatch({
        type: ActionReducer.UPDATE_USER,
        payload: user,
      });
    }

    if (!loadingNotification && userNotification) {
      // UPDATE GLOBAL USER NOTIF COUNT
      dispatch({
        type: ActionReducer.UPDATE_NOTIFICATION_COUNT,
        payload: userNotification,
      });
    }
  }, [isLoading, user, loadingNotification, userNotification, dispatch]);

  return {
    showAside,
    setShowAside,
    userNotif,
    refetchNotification,
    displayBanner,
    handleCloseBannerProfileHasFilled,
    showBannerProfile,
    userData,
  };
};

export { useMainLayout };
