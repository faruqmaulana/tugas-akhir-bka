/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";
import BaseTable from "~/common/components/ui/table/BaseTable";
import {
  FAKULTAS,
  type FakultasType,
} from "~/common/constants/MASTER-DATA/FAKULTAS";

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<FakultasType>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Total Prodi",
        accessorKey: "total_prodi",
      },
    ],
    []
  );

  return (
    <>
      <BaseTable data={FAKULTAS} columns={columns} showColumnFilters={false} />
    </>
  );
};

export default Example;
