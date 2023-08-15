import React from "react";
import { Button } from "../button/Button";
import TrashIcon from "../../svg/TrashIcon";
import EditIcon from "../../svg/EditIcon";

const TableAction = ({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
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
