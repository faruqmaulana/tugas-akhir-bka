import { useRouter } from "next/router";
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter";

const useHeadingTitle = () => {
  const router = useRouter();

  const pageHeading = capitalizeFirstLetter(
    router.pathname.replaceAll("/", " ").replaceAll("-", " ")
  );

  const moduleHeading = pageHeading?.replaceAll("Master", "");

  return {
    router,
    pageHeading,
    moduleHeading,
  };
};

export { useHeadingTitle };
