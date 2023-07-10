/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";
import BaseTable from "~/common/components/ui/table/BaseTable";
import {
  TINGKAT_KEJUARAAN,
  TINGKAT_KEJUARAAN_FORM,
  type TingkatKejuaraan,
} from "~/common/constants/MASTER-DATA/TINGKAT_KEJUARAAN";
import PageHeading from "~/common/components/ui/header/PageHeading";
import Modal from "~/common/components/ui/modal/Modal";
import FormModalContent from "~/common/components/ui/modal/FormModalContent";
import { useStatusPengajuan } from "~/common/hooks/master-data/useStatusPengajuan";
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
    initialData: TINGKAT_KEJUARAAN_FORM,
    updateFormData: formData,
  };
  
  const columns = useMemo<MRT_ColumnDef<TingkatKejuaraan>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Total Kejuaraan",
        accessorKey: "total_kejuaraan",
      },
      {
        header: "Action",
        ...tableActionConfig,
        Cell: ({ row }) => (
          <TableAction
            onEdit={() => handleEdit(row.original, TINGKAT_KEJUARAAN_FORM)}
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
      <BaseTable
        data={TINGKAT_KEJUARAAN}
        columns={columns}
        showColumnFilters={false}
      />
    </>
  );
};

export default Example;
