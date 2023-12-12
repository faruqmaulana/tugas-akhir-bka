/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useCurrentUser } from "~/common/hooks/module/profile";
import PlusIcon from "../../svg/PlusIcon";
import { Button } from "../button/Button";
import { useHeadingTitle } from "~/common/hooks/useHeading";
import { Role } from "@prisma/client";
import { useMainLayout } from "~/common/hooks/layout/useMainLayout";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import Link from "next/link";

type PageTypeHeading = {
  title?: string;
  className?: string;
  subTitle?: string;
  showCreateButton?: boolean;
  link?: string;
  onOpen?: () => void;
  ownButton?: React.ReactNode;
  createButtonTitle?: string;
};

const PageHeading = (props: PageTypeHeading) => {
  const {
    className,
    title,
    subTitle,
    onOpen,
    showCreateButton,
    createButtonTitle,
    link = undefined,
    ownButton = false,
  } = props;
  const { router, pageHeading, moduleHeading } = useHeadingTitle();
  const { displayBanner } = useMainLayout();
  const { role } = useCurrentUser();
  const styleHeader = [];

  const handleRenderAddButton = () => {
    if (!showCreateButton) return false;
    if (showCreateButton) return true;
    if (role === Role.ADMIN && router.asPath.includes("master-data"))
      return true;

    return false;
  };

  if (className) styleHeader.push(className);

  return (
    <div
      className={`mb-[15px] flex items-center justify-between ${styleHeader.join(
        " "
      )}`}
    >
      <div className="flex items-center justify-between">
        <h1
          className={`text-xl font-bold text-charcoal-900 lg:text-3xl
            ${subTitle && "mr-1"}`}
        >
          {title || pageHeading}
        </h1>
        {subTitle && (
          <h4 className="text-lg font-bold text-secondary-400">
            &#40;
            {subTitle}
            &#41;
          </h4>
        )}
      </div>
      {handleRenderAddButton() &&
        (displayBanner ? (
          <Popover>
            <PopoverTrigger>
              <Button
                isMedium
                isSuccess
                className="flex !cursor-not-allowed items-center gap-2 !bg-gray-400 px-6 py-3 text-base hover:!bg-gray-400"
              >
                <PlusIcon />
                <span> Add {createButtonTitle || moduleHeading}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="z-50 overflow-hidden rounded-md border border-gray-400 bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-w-[250px]">
              Mohon lengkapi data profil anda terlebih dahulu. <Link href='/profile' className="text-blue-500 font-semibold underline">KLIK DISINI</Link>
            </PopoverContent>
          </Popover>
        ) : (
          <Button
            isMedium
            isSuccess
            isDisabled={displayBanner}
            className="flex items-center gap-2 px-6 py-3 text-base"
            onClick={() => {
              if (link) {
                void router.push(link);
                return;
              }
              if (onOpen) {
                onOpen();
              }
            }}
          >
            <PlusIcon />
            <span> Add {createButtonTitle || moduleHeading}</span>
          </Button>
        ))}
      {ownButton || ""}
    </div>
  );
};

export default PageHeading;
