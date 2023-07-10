import { useRouter } from "next/router";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

const useHeadingTitle = () => {
  const router = useRouter();

  const pageHeading = capitalizeFirstLetter(
    router.pathname.replaceAll("/", " ").replaceAll("-", " ")
  );

  const moduleHeading = pageHeading?.replaceAll("Master", "");

  return {
    pageHeading,
    moduleHeading,
  };
};

export { useHeadingTitle };
