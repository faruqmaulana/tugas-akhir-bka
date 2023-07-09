/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { ORKEM, type Orkem } from "~/common/constants/MASTER-DATA/ORKEM";

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<Orkem>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Jumlah Mahasiswa",
        accessorKey: "total_kejuaraan",
      },
    ],
    []
  );

  return (
    <>
      <BaseTable data={ORKEM} columns={columns} showColumnFilters={false} />
    </>
  );
};

export default Example;
