/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MaterialReactTable } from "material-react-table";
import React from "react";
import { Button } from "../button/Button";
import { ExportToCsv } from "export-to-csv";
import DownloadIcon from "../../svg/DownloadIcon";

const BaseTable = ({ columns, data, showColumnFilters = true }: any) => {
  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c: { header: any }) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportRows = (rows: any[]) => {
    csvExporter.generateCsv(rows.map((row: { original: any }) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(data);
  };

  console.log("datasss", data);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      initialState={{
        showColumnFilters: showColumnFilters,
        density: "compact",
      }}
      renderTopToolbarCustomActions={({ table }) => (
        <div className="flex flex-wrap gap-4 p-2">
          <Button
            className="flex items-center gap-2 px-6 py-3 text-base"
            isSmall
            isPrimary
            onClick={() => handleExportData()}
            isDisabled={table.getPrePaginationRowModel().rows.length === 0}
          >
            <DownloadIcon isWhite />
            <span>All Data</span>
          </Button>
          <Button
            className="flex items-center gap-2 px-6 py-3 text-base"
            isSmall
            isPrimary
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
            isDisabled={
              table.getPrePaginationRowModel().rows.length === data.length ||
              table.getPrePaginationRowModel().rows.length === 0
            }
          >
            <DownloadIcon isWhite />
            <span>Filtered Data</span>
          </Button>
        </div>
      )}
    />
  );
};

export default BaseTable;
