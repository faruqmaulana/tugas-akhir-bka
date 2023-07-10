/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";
import BaseTable from "~/common/components/ui/table/BaseTable";
import {
  FAKULTAS,
  FAKULTAS_FORM,
  type FakultasType,
} from "~/common/constants/MASTER-DATA/FAKULTAS";
import { useStatusPengajuan } from "~/common/hooks/master-data/useStatusPengajuan";
import Modal from "~/common/components/ui/modal/Modal";
import PageHeading from "~/common/components/ui/header/PageHeading";
import FormModalContent from "~/common/components/ui/modal/FormModalContent";
import { tableActionConfig } from "~/common/config/TABLE_CONFIG";
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
    initialData: FAKULTAS_FORM,
    updateFormData: formData,
  };
  
  const columns = useMemo<MRT_ColumnDef<FakultasType>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        Cell: ({ cell }) => `Fakultas ${cell.getValue() as string}`,
      },
      {
        header: "Total Prodi",
        accessorKey: "total_prodi",
      },
      {
        header: "Action",
        ...tableActionConfig,
        Cell: ({ row }) => (
          <TableAction
            onEdit={() => handleEdit(row.original, FAKULTAS_FORM)}
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
      <BaseTable data={FAKULTAS} columns={columns} showColumnFilters={false} />
    </>
  );
};

export default Example;
