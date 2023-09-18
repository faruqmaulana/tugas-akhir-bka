/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";
import BaseTable from "~/common/components/ui/table/BaseTable";
import PageHeading from "~/common/components/ui/header/PageHeading";
import Modal from "~/common/components/ui/modal/Modal";
import { tableActionConfig } from "~/common/config/TABLE_CONFIG";
import TableAction from "~/common/components/ui/table/TableAction";
import { useStudyProgram } from "~/common/hooks/master-data/useStudyProgram";
import ModalForm from "~/common/components/ui/modal/ModalForm";
import DefaultModalDelete from "~/common/components/ui/modal/DefaultModalDelete";
import { type AllStudyProgramType } from "~/server/api/module/master-data/study-program/_router";

const Example = () => {
  const {
    studyProgramData,
    handleEdit,
    STUDY_PROGRAM_FORM,
    modalState,
    handleClose,
    handleUpdateSubmit,
    onUpdateSubmit,
    handleDelete,
    onDeleteData,
    handleAdd,
    onAddSubmit,
  } = useStudyProgram();

  const columns = useMemo<MRT_ColumnDef<AllStudyProgramType[0]>[]>(
    () => [
      {
        header: "Prodi",
        accessorKey: "name",
      },
      {
        header: "Fakultas",
        accessorKey: "Fakultas.name",
      },
      {
        header: "Jumlah Mahasiswa",
        accessorKey: "_count.user",
      },
      {
        header: "Action",
        accessorKey: "id",
        ...tableActionConfig,
        Cell: ({ row }) => (
          <TableAction
            onEdit={() => handleEdit(row.original)}
            onDelete={() => handleDelete(row.original)}
            disableDelete={row.original._count.user > 0}
          />
        ),
      },
    ],
    [studyProgramData]
  );

  return (
    <>
      <PageHeading showCreateButton onOpen={handleAdd} />
      <Modal
        isOpen={modalState.isAddModalOpen}
        content={
          <ModalForm
            formTitle="Tambah Data Fakultas"
            onSubmit={handleUpdateSubmit(onAddSubmit)}
            FORMS={STUDY_PROGRAM_FORM}
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
            formTitle="ubah Data Fakultas"
            onSubmit={handleUpdateSubmit(onUpdateSubmit)}
            FORMS={STUDY_PROGRAM_FORM}
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
        isLoading={modalState.isDeleteLoading}
      />
      <BaseTable data={studyProgramData} columns={columns} />
    </>
  );
};
export default Example;
