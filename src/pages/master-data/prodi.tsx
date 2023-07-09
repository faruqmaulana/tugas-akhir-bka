/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { PRODI, type ProdiType } from "~/common/constants/MASTER-DATA/PRODI";
import PageHeading from "~/common/components/ui/header/PageHeading";
import AddProdi from "~/common/components/ui/page/prodi/AddProdi";

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<ProdiType>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Jumlah Mahasiswa",
        accessorKey: "jumlah_mahasiswa",
      },
    ],
    []
  );

  return (
    <>
      <PageHeading
        showCreateButton
        modal={{
          content: <AddProdi />,
          onSuccessButton: () => {
            console.log("aa");
          },
        }}
      />
      <BaseTable data={PRODI} columns={columns} showColumnFilters={false} />
    </>
  );
};

export default Example;
