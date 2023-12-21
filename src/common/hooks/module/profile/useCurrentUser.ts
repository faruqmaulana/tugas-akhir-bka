import { Role } from "@prisma/client";
import { useGlobalContext } from "~/common/context/GlobalContext";
import { useSession } from "next-auth/react";

const useCurrentUser = () => {
  const {
    state: { user },
  } = useGlobalContext();

  const { data: session } = useSession();
  const role = session?.user.role;
  const isAdmin = session?.user.role === Role.ADMIN;
  const currentUserName = user?.name;

  return { isAdmin, currentUserName, user, role, session };
};

export { useCurrentUser };
