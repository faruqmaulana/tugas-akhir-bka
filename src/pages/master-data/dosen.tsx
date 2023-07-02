/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";
import { MAHASISWA, type Mahasiswa } from "~/common/constants/DUMMY_MAHASISWA";
import BaseTable from "~/common/components/ui/table/BaseTable";

//Icons Imports

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Mahasiswa>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        enableClickToCopy: true,
      },
      {
        header: "Email",
        accessorKey: "email",
        enableClickToCopy: true,
      },
      {
        header: "Phone",
        accessorKey: "phone",
        enableClickToCopy: true,
      },
      {
        accessorKey: "npm",
        header: "NBI",
      },
      {
        accessorKey: "fakultas",
        header: "Fakultas",
      },
      {
        accessorKey: "prodi",
        header: "Prodi",
      },
      {
        accessorKey: "semester",
        header: "Semester",
      },
      {
        accessorKey: "total_prestasi",
        header: "Total Prestasi",
      },
    ],
    []
  );

  return (
    <>
      <BaseTable data={MAHASISWA} columns={columns} />
    </>
  );
};

export default Example;
