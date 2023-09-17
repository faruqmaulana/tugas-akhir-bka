/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { tableActionConfig } from "~/common/config/TABLE_CONFIG";
import TableAction from "~/common/components/ui/table/TableAction";
import { useStatusPengajuan } from "~/common/hooks/master-data/useStatusPengajuan";
import PageHeading from "~/common/components/ui/header/PageHeading";
import Modal from "~/common/components/ui/modal/Modal";
import { useDosen } from "~/common/hooks/master-data/dosen/useDosen";
import BaseForm from "~/common/components/ui/form/BaseForm";
import { type AllDosenType } from "~/server/api/module/master-data/lecturer/_router";
import { Button } from "~/common/components/ui/button";

const Example = () => {
  const {
    dosenData,
    handleEdit,
    modalState,
    DOSEN_FORM,
    handleClose,
    handleUpdateSubmit,
    onUpdateSubmit,
  } = useDosen();

  const { handleAdd, handleDelete } = useStatusPengajuan();

  const columns = useMemo<MRT_ColumnDef<AllDosenType[0]>[]>(
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
        accessorKey: "prodi.name",
      },
      {
        header: "Fakultas",
        accessorKey: "prodi.Fakultas.name",
      },
      {
        header: "Action",
        ...tableActionConfig,
        Cell: ({ row }) => (
          <TableAction
            onEdit={() => handleEdit(row.original)}
            onDelete={() => handleDelete(row.original)}
          />
        ),
      },
    ],
    [dosenData]
  );

  return (
    <>
      <PageHeading showCreateButton onOpen={handleAdd} />
      <Modal
        isOpen={modalState.isEditModalOpen}
        content={
          <form onSubmit={handleUpdateSubmit(onUpdateSubmit)}>
            <BaseForm data={DOSEN_FORM} />
            <Button
              isSubmit
              isSuccess
              isMedium
              isLoading={modalState.isEditLoading}
              className="flex w-fit items-center gap-2"
            >
              Submit
            </Button>
          </form>
        }
        onCloseButton={handleClose}
      />
      <BaseTable data={dosenData} columns={columns} />
    </>
  );
};

export default Example;
