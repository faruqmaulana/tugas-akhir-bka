/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";

//Icons Imports
import { data, type Employee } from "~/common/constants/STATISTIK_PRESTASI";
import BaseTable from "./BaseTable";

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Employee>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        enableClickToCopy: true,
      },
      {
        header: "Fakultas",
        accessorKey: "fakultas",
      },
      {
        accessorKey: "prestasi",
        header: "Prestasi",
      },
      {
        accessorKey: "tingkatKegiatan",
        header: "Tingkat Kegiatan",
      },
      {
        accessorKey: "namaKegiatan",
        header: "Nama Kegiatan",
        enableClickToCopy: true,
      },
    ],
    []
  );

  return <BaseTable data={data} columns={columns} />;
};

export default Example;
