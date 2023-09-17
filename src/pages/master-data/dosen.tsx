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
import DefaultModalDelete from "~/common/components/ui/modal/DefaultModalDelete";
import DefaultModalForms from "~/common/components/ui/modal/ModalForm";
import DefaultModalForm from "~/common/components/ui/modal/ModalForm";
import ModalForm from "~/common/components/ui/modal/ModalForm";

const Example = () => {
  const {
    dosenData,
    modalState,
    DOSEN_FORM,
    handleClose,
    handleEdit,
    handleUpdateSubmit,
    onUpdateSubmit,
    handleDelete,
    onDeleteData,
    handleAdd,
    onAddSubmit,
  } = useDosen();

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
            disableDelete={row.original.prestasiDataTable.length > 0}
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
        isOpen={modalState.isAddModalOpen}
        content={
          <ModalForm
            onSubmit={handleUpdateSubmit(onAddSubmit)}
            FORMS={DOSEN_FORM}
            loadingSubmit={modalState.isAddLoading}
            onClose={handleClose}
          />
        }
        onCloseButton={handleClose}
      />
      <Modal
        isOpen={modalState.isEditModalOpen}
        content={
          <ModalForm
            onSubmit={handleUpdateSubmit(onUpdateSubmit)}
            FORMS={DOSEN_FORM}
            loadingSubmit={modalState.isEditLoading}
            onClose={handleClose}
          />
        }
        onCloseButton={handleClose}
      />
      <Modal
        confirm
        content={<DefaultModalDelete detailInfo={modalState.detailInfo} />}
        buttonCenter
        showButtonDanger
        showButtonClose
        onCloseButton={handleClose}
        onDangerButton={onDeleteData}
        isOpen={modalState.isDeleteModalOpen}
      />
      <BaseTable data={dosenData} columns={columns} />
    </>
  );
};

export default Example;
