/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { DOSEN, DOSEN_FORM, type DosenType } from "~/common/constants/MASTER-DATA/DOSEN";
import { tableActionConfig } from "~/common/config/TABLE_CONFIG";
import TableAction from "~/common/components/ui/table/TableAction";
import { useStatusPengajuan } from "~/common/hooks/master-data/useStatusPengajuan";
import PageHeading from "~/common/components/ui/header/PageHeading";
import Modal from "~/common/components/ui/modal/Modal";
import FormModalContent from "~/common/components/ui/modal/FormModalContent";

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
    initialData: DOSEN_FORM,
    updateFormData: formData,
  };

  const columns = useMemo<MRT_ColumnDef<DosenType>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "NIDN",
        accessorKey: "nidn",
        enableClickToCopy: true,
      },
      {
        header: "Prodi",
        accessorKey: "prodi",
      },
      {
        header: "Fakultas",
        accessorKey: "fakultas",
      },
      {
        header: "Action",
        ...tableActionConfig,
        Cell: ({ row }) => (
          <TableAction
            onEdit={() => handleEdit(row.original, DOSEN_FORM)}
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
      <BaseTable data={DOSEN} columns={columns} />
    </>
  );
};

export default Example;
