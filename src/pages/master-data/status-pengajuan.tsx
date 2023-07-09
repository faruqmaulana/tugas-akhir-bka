import React, { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { STATUS, type StatusType } from "~/common/constants/MASTER-DATA/STATUS";
import PageHeading from "~/common/components/ui/header/PageHeading";
import PengajuanForm from "~/common/components/ui/page/status-pengajuan/PengajuanForm";

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<StatusType>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Warna",
        accessorKey: "color",
        Cell: ({ cell, column }) => (
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: cell.getValue() as string }}
          />
        ),
      },
    ],
    []
  );

  return (
    <>
      <PageHeading
        showCreateButton
        modal={{
          content: <PengajuanForm />,
          onSuccessButton: () => {
            console.log("aa");
          },
        }}
      />
      <BaseTable data={STATUS} columns={columns} showColumnFilters={false} />
    </>
  );
};

export default Example;
