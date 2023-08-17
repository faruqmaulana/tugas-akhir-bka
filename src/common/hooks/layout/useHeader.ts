/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from "next/router";
import { type HeaderProps } from "~/common/components/layout/partials/Header";
import { useGlobalContext } from "~/common/context/GlobalContext";
import { signOut } from "next-auth/react";

const useHeader = (props: HeaderProps) => {
  const router = useRouter();
  const {
    state: { user },
  } = useGlobalContext();
  const { setShowAside, showAside } = props;

  const handleHamburgerButton = () => {
    setShowAside(!showAside);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true });
    // setTimeout(() => {
    //   router.push("/");
    // }, 1000);
  };

  return { router, user, handleHamburgerButton, handleSignOut };
};

export { useHeader };
