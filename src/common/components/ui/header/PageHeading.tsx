/* eslint-disable @typescript-eslint/restrict-template-expressions */

import capitalizeFirstLetter from "~/common/utils/capitalizeFirstLetter";
import PlusIcon from "../../svg/PlusIcon";
import { Button } from "../button/Button";
import { useRouter } from "next/router";
import Modal from "../modal/Modal";
import { useState } from "react";
import { type ReactNode } from "react";

type PageTypeHeading = {
  className?: string;
  subTitle?: string;
  showCreateButton?: boolean;
  modal?: {
    onSuccessButton?: () => void;
    content?: ReactNode;
  };
};

const PageHeading = (props: PageTypeHeading) => {
  const { className, subTitle, showCreateButton, modal } = props;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handlePageHeading = () => {
    return capitalizeFirstLetter(
      router.pathname.replaceAll("/", " ").replaceAll("-", " ")
    );
  };

  const styleHeader = [];
  const closeModal = () => {
    setIsOpen(false);
  };

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
          {handlePageHeading()}
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
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <PlusIcon />
          <span> Add {handlePageHeading()?.replaceAll("Master", "")}</span>
        </Button>
      )}
      {modal && (
        <Modal
          content={modal.content}
          showButtonSuccess={modal.onSuccessButton ? true : false}
          onSuccessButton={modal.onSuccessButton}
          title={`Tambah ${handlePageHeading()?.replaceAll("Master", "")}`}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default PageHeading;
