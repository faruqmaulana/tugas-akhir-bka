import React from "react";
import { Button } from "./Button";
import EyeIcon from "../../svg/EyeIcon";

const ViewDetailButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Button
      onClick={onClick}
      isPrimary
      isSmall
      className="flex w-fit items-center gap-2 !rounded-full text-center"
    >
      <EyeIcon color="#FFFFFF" />
      <span>View Detail</span>
    </Button>
  );
};

export default ViewDetailButton;
