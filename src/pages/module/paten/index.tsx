import { type MRT_ColumnDef } from "material-react-table";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import ViewDetailButton from "~/common/components/ui/button/ViewDetailButton";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { tableActionConfig } from "~/common/config/TABLE_CONFIG";
import {
  DATA_PATEN,
  type PatenType,
} from "~/common/constants/DUMMY_PATEN_HAKI";
import { handleBgColor } from "~/common/helpers/handleBgColor";

const UserManagement = () => {
  const router = useRouter();

  const columns = useMemo<MRT_ColumnDef<PatenType>[]>(
    () => [
      {
        header: "NBI",
        accessorKey: "NBI",
        enableClickToCopy: true,
      },
      {
        header: "Semester",
        accessorKey: "Semester",
        enableClickToCopy: true,
      },
      {
        header: "Prodi",
        accessorKey: "Prodi",
        enableClickToCopy: true,
      },
      {
        header: "Fakultas",
        accessorKey: "Fakultas",
        enableClickToCopy: true,
      },
      {
        header: "Dosen",
        accessorKey: "Dosen",
        enableClickToCopy: true,
      },
      {
        header: "Jenis",
        accessorKey: "Jenis",
        enableClickToCopy: true,
      },
      {
        header: "Judul Paten",
        accessorKey: "JudulPaten",
        enableClickToCopy: true,
      },
      {
        header: "Nomor Paten",
        accessorKey: "NomorPaten",
        enableClickToCopy: true,
      },
      {
        header: "Pemegang Paten",
        accessorKey: "PemegangPaten",
        enableClickToCopy: true,
      },
      {
        header: "Penulis Penemu",
        accessorKey: "PenulisPenemu",
        enableClickToCopy: true,
      },
      {
        header: "Abstrak",
        accessorKey: "Abstrak",
        enableClickToCopy: true,
      },
      {
        header: "Klaim",
        accessorKey: "Klaim",
        enableClickToCopy: true,
      },
      {
        header: "Gambar",
        accessorKey: "Gambar",
        enableClickToCopy: true,
      },
      {
        header: "Klasifikasi",
        accessorKey: "Klasifikasi",
        enableClickToCopy: true,
      },
      {
        header: "Tanggal Pengajuan",
        accessorKey: "TanggalPengajuan",
        enableClickToCopy: true,
      },
      {
        header: "Tanggal Diberikan",
        accessorKey: "TanggalDiberikan",
        enableClickToCopy: true,
      },
      {
        header: "Masa Berlaku",
        accessorKey: "MasaBerlaku",
        enableClickToCopy: true,
      },
      {
        header: "Daerah Perlindungan",
        accessorKey: "DaerahPerlindungan",
        enableClickToCopy: true,
      },
      {
        header: "Status",
        accessorKey: "Status",
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
      <PageHeading
        title="Module Data Paten"
        showCreateButton
        createButtonTitle="Data Paten"
        link="haki/tambah"
      />
      <Card header="SEMUA DATA PENGAJUAN PATEN" className="mt-[30px]">
        <BaseTable data={DATA_PATEN} columns={columns} />
      </Card>
    </>
  );
};

export default UserManagement;
