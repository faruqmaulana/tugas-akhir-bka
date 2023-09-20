/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";
import BaseTable from "~/common/components/ui/table/BaseTable";
import Modal from "~/common/components/ui/modal/Modal";
import PageHeading from "~/common/components/ui/header/PageHeading";
import { tableActionConfig } from "~/common/config/TABLE_CONFIG";
import TableAction from "~/common/components/ui/table/TableAction";
import ModalForm from "~/common/components/ui/modal/ModalForm";
import { type AllFacultyType } from "~/server/api/module/master-data/faculty/_router";
import { useFaculty } from "~/common/hooks/master-data/useFaculty";
import DefaultModalDelete from "~/common/components/ui/modal/DefaultModalDelete";

const Example = () => {
  const {
    facultyData,
    handleEdit,
    FACULTY_FORM,
    modalState,
    handleClose,
    handleUpdateSubmit,
    onUpdateSubmit,
    handleDelete,
    onDeleteData,
    handleAdd,
    onAddSubmit,
  } = useFaculty();

  const columns = useMemo<MRT_ColumnDef<AllFacultyType[0]>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Total Prodi",
        Cell: ({ row }) => row.original.prodi.length,
      },
      {
        header: "Action",
        ...tableActionConfig,
        Cell: ({ row }) => (
          <TableAction
            onEdit={() => handleEdit(row.original)}
            onDelete={() => handleDelete(row.original)}
            disableDelete={row.original.prodi.length > 0}
          />
        ),
      },
    ],
    [facultyData]
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
            FORMS={FACULTY_FORM}
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
            FORMS={FACULTY_FORM}
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
      <BaseTable data={facultyData} columns={columns} />
    </>
  );
};

export default Example;
