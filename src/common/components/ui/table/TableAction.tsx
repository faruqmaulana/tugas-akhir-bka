import React from "react";
import { Button } from "../button/Button";
import TrashIcon from "../../svg/TrashIcon";
import EditIcon from "../../svg/EditIcon";

const TableAction = ({
  onEdit,
  onDelete,
  disableDelete = false,
}: {
  onEdit: () => void;
  onDelete: () => void;
  disableDelete?: boolean;
}) => {
  return (
    <div className="flex flex-row gap-1">
      <Button
        isPrimary
        isSmall
        className="flex items-center gap-2 text-center"
        onClick={() => {
          onEdit();
        }}
      >
        <EditIcon />
        <span>Edit</span>
      </Button>
      <Button
        isDisabled={disableDelete}
        isDanger
        isSmall
        className="flex items-center gap-2 text-center"
        onClick={() => {
          onDelete();
        }}
      >
        <TrashIcon />
      </Button>
    </div>
  );
};

export default TableAction;
