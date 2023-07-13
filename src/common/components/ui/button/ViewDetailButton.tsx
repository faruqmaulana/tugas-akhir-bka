import React from "react";
import { Button } from "./Button";
import EyeIcon from "../../svg/EyeIcon";

const ViewDetailButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button
      isPrimary
      isSmall
      onClick={onClick}
      className="flex w-fit items-center gap-2 !rounded-full text-center !py-1 !px-3"
    >
      <EyeIcon width="14" height="10" color="#FFFFFF" />
      <span className="text-[10px]">View Detail</span>
    </Button>
  );
};

export default ViewDetailButton;
