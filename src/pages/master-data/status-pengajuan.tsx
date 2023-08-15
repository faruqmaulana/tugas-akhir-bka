/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";
import BaseTable from "~/common/components/ui/table/BaseTable";
import {
  PENGAJUAN_FORM,
  STATUS,
  type StatusType,
} from "~/common/constants/MASTER-DATA/STATUS";
import PageHeading from "~/common/components/ui/header/PageHeading";
import Modal from "~/common/components/ui/modal/Modal";
import { tableActionConfig } from "~/common/config/TABLE_CONFIG";
import { useStatusPengajuan } from "~/common/hooks/master-data/useStatusPengajuan";
import FormModalContent from "~/common/components/ui/modal/FormModalContent";
import TableAction from "~/common/components/ui/table/TableAction";

const Example = () => {
  const {
    isOpen,
    formData,
    title,
    confirm,
    success,
    content,
    createAction,
    handleAdd,
    handleEdit,
    handleDelete,
    onClose,
    onSubmit,
    showButtonSuccess,
    showButtonConfirm,
    showButtonClose,
    showButtonDanger,
  } = useStatusPengajuan();

  const contentData = {
    success,
    createAction,
    content,
    initialData: PENGAJUAN_FORM,
    updateFormData: formData,
  };

  const columns = useMemo<MRT_ColumnDef<StatusType>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Warna",
        accessorKey: "color",
        Cell: ({ cell }) => (
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: cell.getValue() as string }}
          />
        ),
      },
      {
        header: "Action",
        accessorKey: "id",
        ...tableActionConfig,
        Cell: ({ row }) => (
          <TableAction
            onEdit={() => handleEdit(row.original, PENGAJUAN_FORM)}
            onDelete={() => handleDelete(row.original)}
          />
        ),
      },
    ],
    []
  );

  return (
    <>
      <PageHeading showCreateButton onOpen={handleAdd} />
      <Modal
        isOpen={isOpen}
        content={<FormModalContent {...contentData} />}
        onClose={onClose}
        title={success ? "" : title}
        success={success}
        confirm={!success && confirm}
        showButtonConfirm={showButtonConfirm}
        showButtonSuccess={showButtonSuccess}
        showButtonClose={showButtonClose}
        showButtonDanger={showButtonDanger}
        buttonCenter={confirm || success}
        onConfirmButton={onClose}
        onCloseButton={onClose}
        onSuccessButton={onSubmit}
        onDangerButton={onSubmit}
      />
      <BaseTable data={STATUS} columns={columns} showColumnFilters={false} />
    </>
  );
};

export default Example;
