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
import { useRouter } from "next/router";

interface RowType {
  id: string;
  // other properties
}

const BaseTable = ({ columns, data, showColumnFilters = true }: any) => {
  const router = useRouter();
  const isModulePage = router.pathname.includes("/module");
  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c: { header: any }) => c.header),
  };

  // Transform data based on accessorKey data\
  const transformedData = (
    columns: { id: string; headerName: string }[],
    tableData: any
  ) =>
    tableData &&
    tableData?.map((item: any) => {
      const transformedItem: any = {};
      columns.forEach((accessor) => {
        if (accessor.id !== "Action") {
          transformedItem[accessor.id] = item[accessor.id] || "";
        }
      });
      return transformedItem;
    });

  const handleExportFilteredRows = ({
    rows,
    columnHeader,
  }: {
    rows: any[];
    columnHeader: { id: string; headerName: string }[];
  }) => {
    const csvExporter = new ExportToCsv({
      ...csvOptions,
      headers: columnHeader.map((val) =>
        val.headerName !== "Action" ? val.headerName : ""
      ),
    });
    const filteredData = rows.map((row: { original: any }) => row.original);
    csvExporter.generateCsv(transformedData(columnHeader, filteredData));
  };

  const handleExportData = ({
    columnHeader,
  }: {
    columnHeader: { id: string; headerName: string }[];
  }) => {
    const csvExporter = new ExportToCsv({
      ...csvOptions,
      headers: columnHeader.map((val) =>
        val.headerName !== "Action" ? val.headerName : ""
      ),
    });
    transformedData(columnHeader, data);
    csvExporter.generateCsv(transformedData(columnHeader, data));
  };

  if (!data)
    return (
      <div className="animate-pulse">
        <div className="mb-6 mt-3 h-4 rounded bg-gray-200"></div>
        <div className="mb-6 h-4 rounded bg-gray-300"></div>
        <div className="mb-6 h-4 rounded bg-gray-200"></div>
        <div className="mb-6 h-4 rounded bg-gray-300"></div>
        <div className="mb-6 h-4 rounded bg-gray-200"></div>
      </div>
    );

  return (
    <MaterialReactTable
      enableRowSelection
      columns={columns}
      data={data}
      initialState={{
        showColumnFilters: showColumnFilters,
        density: "compact",
      }}
      // navigate to the detail module when clicking on a row on the current module page.
      muiTableBodyRowProps={({ row }) => ({
        onClick: () => {
          if (isModulePage && (row.original as RowType).id) {
            void router.push(
              router.pathname + "/detail/" + (row.original as RowType).id
            );
          }
        },
        sx: { cursor: isModulePage ? "pointer" : "default" },
      })}
      renderTopToolbarCustomActions={({ table }) => (
        <div className="flex w-[245px] space-x-3 overflow-auto py-1 xs:w-auto">
          <div className="flex flex-shrink-0">
            <Button
              className="flex items-center gap-2 px-6 py-3 text-base"
              isSmall
              isPrimary
              onClick={() =>
                handleExportData({
                  columnHeader: table
                    .getVisibleFlatColumns()
                    .slice(1)
                    .map((val) => {
                      return {
                        id: val.columnDef.id as string,
                        headerName: val.columnDef.header as string,
                      };
                    }),
                })
              }
              isDisabled={table.getPrePaginationRowModel().rows.length === 0}
            >
              <DownloadIcon isWhite />
              <span>All Data</span>
            </Button>
          </div>
          <div className="flex flex-shrink-0">
            <Button
              className="flex items-center gap-2 px-6 py-3 text-base"
              isSmall
              isPrimary
              onClick={() =>
                handleExportFilteredRows({
                  columnHeader: table
                    .getVisibleFlatColumns()
                    .slice(1)
                    .map((val) => {
                      return {
                        id: val.columnDef.id as string,
                        headerName: val.columnDef.header as string,
                      };
                    }),
                  rows: table.getPrePaginationRowModel().rows,
                })
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

          <div className="flex flex-shrink-0">
            <Button
              className="flex items-center gap-2 px-6 py-3 text-base"
              isSmall
              isPrimary
              isDisabled={
                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
              }
              onClick={() =>
                handleExportFilteredRows({
                  columnHeader: table
                    .getVisibleFlatColumns()
                    .slice(1)
                    .map((val) => {
                      return {
                        id: val.columnDef.id as string,
                        headerName: val.columnDef.header as string,
                      };
                    }),
                  rows: table.getSelectedRowModel().rows,
                })
              }
            >
              <DownloadIcon isWhite />
              <span>Selected Data</span>
            </Button>
          </div>
        </div>
      )}
    />
  );
};

export default BaseTable;
