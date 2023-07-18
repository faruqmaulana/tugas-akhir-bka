import { type MRT_ColumnDef } from "material-react-table";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import ViewDetailButton from "~/common/components/ui/button/ViewDetailButton";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { tableActionConfig } from "~/common/config/TABLE_CONFIG";
import {
  PENGAJUAN_BEASISWA,
  type PengajuanBeasiswa,
} from "~/common/constants/module/PENGAJUAN_BEASISWA";
import { handleBgColor } from "~/common/helpers/handleBgColor";

const UserManagement = () => {
  const router = useRouter();

  const columns = useMemo<MRT_ColumnDef<PengajuanBeasiswa>[]>(
    () => [
      {
        header: "Status",
        accessorKey: "status",
        enableClickToCopy: true,
        Cell: ({ cell }) => (
          <div
            className="rounded-full px-2 py-1 text-xs font-semibold opacity-95"
            style={{
              backgroundColor: handleBgColor(cell.getValue() as string),
            }}
          >
            {cell.getValue() as string}
          </div>
        ),
      },
      {
        header: "Name",
        accessorKey: "namaMahasiswa",
        enableClickToCopy: true,
      },
      {
        header: "NBI",
        accessorKey: "nbi",
        enableClickToCopy: true,
      },
      {
        header: "Prodi",
        accessorKey: "prodi",
        enableClickToCopy: true,
      },
      {
        header: "Fakultas",
        accessorKey: "fakultas",
        enableClickToCopy: true,
      },
      {
        header: "Semester",
        accessorKey: "semester",
        enableClickToCopy: true,
      },
      {
        header: "Formulir Pengajuan",
        accessorKey: "dokumenFormulirPengajuan",
        enableClickToCopy: true,
      },
      {
        header: "Deskripsi",
        accessorKey: "deskripsi",
        enableClickToCopy: true,
      },
      {
        header: "Dokumen Pendukung",
        accessorKey: "dokumenPendukung",
        enableClickToCopy: true,
      },
      {
        header: "Tanggal Pengajuan",
        accessorKey: "tanggalPengajuan",
        enableClickToCopy: true,
      },
      {
        header: "Action",
        ...tableActionConfig,
        Cell: () => (
          <ViewDetailButton
            onClick={() => {
              const transformUrl = router.pathname.split("/").join("/");
              void router.push(transformUrl + "/detail");
            }}
          />
        ),
      },
    ],
    []
  );

  return (
    <>
      <PageHeading title="Module Pengajuan Beasiswa" />
      <Card header="DATA PENGAJUAN BEASISWA" className="mt-[30px]">
        <BaseTable data={PENGAJUAN_BEASISWA} columns={columns} />
      </Card>
    </>
  );
};

export default UserManagement;
