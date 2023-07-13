import React from "react";
import { Button } from "./Button";
import EditIcon from "../../svg/EditIcon";

const EditButton = ({
  onClick,
  buttontext = "Edit",
  isMedium = true,
  isSmall = false,
}: {
  onClick?: () => void;
  buttontext?: string;
  isMedium?: boolean;
  isSmall?: boolean;
}) => {
  return (
    <Button
      isSecondary
      isMedium={isMedium}
      isSmall={isSmall}
      className="flex items-center gap-2 text-center"
      onClick={onClick}
    >
      <EditIcon />
      <span>{buttontext}</span>
    </Button>
  );
};

export default EditButton;
