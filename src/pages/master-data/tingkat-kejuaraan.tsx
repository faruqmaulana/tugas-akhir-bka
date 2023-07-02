/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";
import BaseTable from "~/common/components/ui/table/BaseTable";
import {
  TINGKAT_KEJUARAAN,
  type TingkatKejuaraan,
} from "~/common/constants/MASTER-DATA/TINGKAT_KEJUARAAN";

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<TingkatKejuaraan>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Total Kejuaraan",
        accessorKey: "total_kejuaraan",
      },
    ],
    []
  );

  return (
    <>
      <BaseTable
        data={TINGKAT_KEJUARAAN}
        columns={columns}
        showColumnFilters={false}
      />
    </>
  );
};

export default Example;
