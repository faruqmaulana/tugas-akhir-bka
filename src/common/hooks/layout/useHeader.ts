/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from "next/router";
import { type HeaderProps } from "~/common/components/layout/partials/Header";
import { useGlobalContext } from "~/common/context/GlobalContext";

const useHeader = (props: HeaderProps) => {
  const router = useRouter();
  const {
    state: { user },
  } = useGlobalContext();

  const { setShowAside, showAside } = props;

  const handleHamburgerButton = () => {
    setShowAside(!showAside);
  };

  return { router, user, handleHamburgerButton };
};

export { useHeader };
