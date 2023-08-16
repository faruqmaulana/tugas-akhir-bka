/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect, useState } from "react";
import { useGlobalContext } from "~/common/context/GlobalContext";
import { ActionReducer } from "~/common/types/context/GlobalContextType";
import { type UserProfileType } from "~/server/queries/module/user/user.query";
import { api } from "~/utils/api";

const useMainLayout = () => {
  const { state, dispatch } = useGlobalContext();
  const [showAside, setShowAside] = useState<boolean>(true);
  const { data: user, isLoading } = api.user.getUserProfile.useQuery();

  useEffect(() => {
    if (!isLoading && user) {
      dispatch({
        type: ActionReducer.UPDATE_USER,
        payload: user as UserProfileType,
      });
    }
  }, [isLoading, user, dispatch]);

  const userData = state?.user;

  return { showAside, setShowAside, userData };
};

export { useMainLayout };
