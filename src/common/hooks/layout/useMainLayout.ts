import { useEffect, useState } from "react";
import { useGlobalContext } from "~/common/context/GlobalContext";
import { ActionReducer } from "~/common/types/context/GlobalContextType";
import { api } from "~/utils/api";

const useMainLayout = () => {
  const { state, dispatch } = useGlobalContext();
  const [showAside, setShowAside] = useState<boolean>(true);
  const { data: user, isLoading } = api.user.getUserProfile.useQuery();

  useEffect(() => {
    if (!isLoading && user) {
      dispatch({ type: ActionReducer.UPDATE_USER, payload: user });
    }
  }, [isLoading, user, dispatch]);

  const userData = state?.user;

  return { showAside, setShowAside, userData };
};

export { useMainLayout };
