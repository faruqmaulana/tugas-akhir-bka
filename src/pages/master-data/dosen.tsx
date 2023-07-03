/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { DOSEN, type DosenType } from "~/common/constants/MASTER-DATA/DOSEN";

const Example = () => {
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
        header: "Fakultas",
        accessorKey: "fakultas",
      },
      {
        header: "Prodi",
        accessorKey: "prodi",
      },
    ],
    []
  );

  return (
    <>
      <BaseTable data={DOSEN} columns={columns} />
    </>
  );
};

export default Example;