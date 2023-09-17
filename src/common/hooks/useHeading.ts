import { useRouter } from "next/router";
import capitalizeFirstLetter from "../helpers/capitalizeFirstLetter";
import { capitalizeFirstWord } from "../helpers/capitalizeFirstWord";

const useHeadingTitle = () => {
  const router = useRouter();
  const transformedPath = router.pathname
    .replaceAll("/", " ")
    .replaceAll("-", " ")
    .replaceAll("master", "")
    .trim();

  const pageHeading = capitalizeFirstLetter(transformedPath);
  const moduleHeading = pageHeading;
  const moduleName = capitalizeFirstWord(transformedPath);

  return {
    router,
    pageHeading,
    moduleHeading,
    moduleName,
  };
};

export { useHeadingTitle };
