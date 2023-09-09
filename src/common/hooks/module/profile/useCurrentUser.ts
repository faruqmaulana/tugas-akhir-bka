import { Role } from "@prisma/client";
import { useGlobalContext } from "~/common/context/GlobalContext";

const useCurrentUser = () => {
  const {
    state: { user },
  } = useGlobalContext();

  const isAdmin = user?.role === Role.ADMIN;
  const currentUserName = user?.name;

  return { isAdmin, currentUserName, user };
};

export { useCurrentUser };
