/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";
import BaseTable from "~/common/components/ui/table/BaseTable";
import Modal from "~/common/components/ui/modal/Modal";
import PageHeading from "~/common/components/ui/header/PageHeading";
import { tableActionConfig } from "~/common/config/TABLE_CONFIG";
import TableAction from "~/common/components/ui/table/TableAction";
import ModalForm from "~/common/components/ui/modal/ModalForm";
import DefaultModalDelete from "~/common/components/ui/modal/DefaultModalDelete";
import { useAchievementLevel } from "~/common/hooks/master-data/useAchievementLevel";
import { type AllAchievementLevelType } from "~/server/api/module/master-data/achievement-level/_router";

const Example = () => {
  const {
    achievementLevelData,
    handleEdit,
    ACHIEVEMENT_LEVEL_FORM,
    modalState,
    handleClose,
    handleUpdateSubmit,
    onUpdateSubmit,
    handleDelete,
    onDeleteData,
    handleAdd,
    onAddSubmit,
  } = useAchievementLevel();

  const columns = useMemo<MRT_ColumnDef<AllAchievementLevelType[0]>[]>(
    () => [
      {
        header: "Tingkat Prestasi",
        accessorKey: "name",
      },
      {
        header: "Total",
        accessorKey: "_count.PrestasiDataTable",
      },
      {
        header: "Action",
        ...tableActionConfig,
        Cell: ({ row }) => (
          <TableAction
            onEdit={() => handleEdit(row.original)}
            onDelete={() => handleDelete(row.original)}
            disableDelete={row.original._count.PrestasiDataTable > 0}
          />
        ),
      },
    ],
    [achievementLevelData]
  );

  return (
    <>
      <PageHeading showCreateButton onOpen={handleAdd} />
      <Modal
        isOpen={modalState.isAddModalOpen}
        content={
          <ModalForm
            formTitle="Tambah Data Tingkat Prestasi"
            onSubmit={handleUpdateSubmit(onAddSubmit)}
            FORMS={ACHIEVEMENT_LEVEL_FORM}
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
            formTitle="Ubah Data Tingkat Prestasi"
            onSubmit={handleUpdateSubmit(onUpdateSubmit)}
            FORMS={ACHIEVEMENT_LEVEL_FORM}
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
      <BaseTable data={achievementLevelData} columns={columns} />
    </>
  );
};

export default Example;
