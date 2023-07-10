/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { STATUS, type StatusType } from "~/common/constants/MASTER-DATA/STATUS";
import PageHeading from "~/common/components/ui/header/PageHeading";
import PengajuanForm from "~/common/components/ui/page/status-pengajuan/PengajuanForm";
import { Button } from "~/common/components/ui/button/Button";
import EditIcon from "~/common/components/svg/EditIcon";
import Modal from "~/common/components/ui/modal/Modal";
import { tableActionConfig } from "~/common/config/TABLE_CONFIG";
import TrashIcon from "~/common/components/svg/TrashIcon";
import { useStatusPengajuan } from "~/common/hooks/master-data/useStatusPengajuan";

const Example = () => {
  const {
    isOpen,
    formData,
    title,
    confirm,
    success,
    content,
    showButtonSuccess,
    isAddData,
    handleAdd,
    handleEdit,
    handleDelete,
    onClose,
    onSubmit,
  } = useStatusPengajuan();

  const handleContent = () => {
    if (success) return <p className="text-center xl:text-lg">{content}</p>;
    if (isAddData) return <PengajuanForm />;

    return <PengajuanForm data={formData} />;
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
          <div className="flex flex-row gap-1">
            <Button
              isPrimary
              isSmall
              className="flex items-center gap-2 text-center"
              onClick={() => handleEdit(row.original)}
            >
              <EditIcon />
              <span>Edit</span>
            </Button>
            <Button
              isDanger
              isSmall
              className="flex items-center gap-2 text-center"
              onClick={() => handleDelete(row.original)}
            >
              <TrashIcon />
            </Button>
          </div>
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
        content={handleContent()}
        onClose={onClose}
        title={success ? "" : title}
        success={success}
        showButtonConfirm={success}
        confirm={!success && confirm}
        showButtonSuccess={!success && showButtonSuccess}
        showButtonClose={!success && confirm}
        showButtonDanger={!success && confirm}
        buttonCenter={confirm || success}
        onConfirmButton={onClose}
        onSuccessButton={onSubmit}
        onCloseButton={onClose}
        onDangerButton={onSubmit}
      />
      <BaseTable data={STATUS} columns={columns} showColumnFilters={false} />
    </>
  );
};

export default Example;
