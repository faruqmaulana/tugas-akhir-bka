/* eslint-disable @typescript-eslint/restrict-template-expressions */
import PlusIcon from "../../svg/PlusIcon";
import { Button } from "../button/Button";
import Modal from "../modal/Modal";
import { useState } from "react";
import { type ReactNode } from "react";
import { useHeadingTitle } from "~/common/hooks/useHeading";

type PageTypeHeading = {
  className?: string;
  subTitle?: string;
  showCreateButton?: boolean;
  onOpen?: () => void;
};

const PageHeading = (props: PageTypeHeading) => {
  const { className, subTitle, showCreateButton, onOpen } = props;
  const { pageHeading, moduleHeading } = useHeadingTitle();

  const styleHeader = [];

  if (className) styleHeader.push(className);

  return (
    <div
      className={`mb-[20px] flex items-center justify-between ${styleHeader.join(
        " "
      )}`}
    >
      <div className="flex items-center justify-between">
        <h1
          className={`text-3xl font-bold text-charcoal-900
            ${subTitle && "mr-1"}`}
        >
          {pageHeading}
        </h1>
        {subTitle && (
          <h4 className="text-lg font-bold text-secondary-400">
            &#40;
            {subTitle}
            &#41;
          </h4>
        )}
      </div>
      {showCreateButton && (
        <Button
          className="flex items-center gap-2 px-6 py-3 text-base"
          isSuccess
          isMedium
          onClick={onOpen}
        >
          <PlusIcon />
          <span> Add {moduleHeading}</span>
        </Button>
      )}
    </div>
  );
};

export default PageHeading;
