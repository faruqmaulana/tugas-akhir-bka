import { useEffect, useState } from "react";
import { useGlobalContext } from "~/common/context/GlobalContext";
import { api } from "~/utils/api";

const useMainLayout = () => {
  const { state, dispatch } = useGlobalContext();
  const [showAside, setShowAside] = useState<boolean>(true);
  const { data: user, isLoading } = api.user.userProfile.useQuery();

  useEffect(() => {
    if (!isLoading && user) {
      dispatch({ type: "UPDATE_USER", payload: user });
    }
  }, [isLoading, user, dispatch]);

  const userData = state?.user;

  return { showAside, setShowAside, userData };
};

export { useMainLayout };
