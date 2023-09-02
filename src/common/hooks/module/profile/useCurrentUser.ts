import { useGlobalContext } from "~/common/context/GlobalContext";

const useCurrentUser = () => {
  const {
    state: { user },
  } = useGlobalContext();

  const isAdmin = user?.role === "ADMIN";
  const currentUserName = user?.name;

  return { isAdmin, currentUserName };
};

export { useCurrentUser };