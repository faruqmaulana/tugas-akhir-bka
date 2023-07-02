/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";
import BaseTable from "~/common/components/ui/table/BaseTable";
import {
  TINGKAT_PRESTASI,
  type TingkatPrestasi,
} from "~/common/constants/MASTER-DATA/TINGKAT_PRESTASI";

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<TingkatPrestasi>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Total Prestasi",
        accessorKey: "total_prestasi",
      },
    ],
    []
  );

  return (
    <>
      <BaseTable
        data={TINGKAT_PRESTASI}
        columns={columns}
        showColumnFilters={false}
      />
    </>
  );
};

export default Example;
