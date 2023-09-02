import { type MRT_ColumnDef } from "material-react-table";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import StatusBadge from "~/common/components/ui/badge/StatusBagde";
import ViewDetailButton from "~/common/components/ui/button/ViewDetailButton";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { tableActionConfig } from "~/common/config/TABLE_CONFIG";
import { type HAKI, DATA_HAKI } from "~/common/constants/DUMMY_PATEN_HAKI";

const UserManagement = () => {
  const router = useRouter();

  const columns = useMemo<MRT_ColumnDef<HAKI>[]>(
    () => [
      {
        header: "Nama Mahasiswa",
        accessorKey: "Pencipta",
        enableClickToCopy: true,
      },
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
        header: "Judul",
        accessorKey: "Judul",
        enableClickToCopy: true,
      },
      {
        header: "Nomor Pendaftaran",
        accessorKey: "NomorPendaftaran",
        enableClickToCopy: true,
      },
      {
        header: "Pemegang HAKI",
        accessorKey: "PemegangHAKI",
        enableClickToCopy: true,
      },

      {
        header: "Deskripsi",
        accessorKey: "Deskripsi",
        enableClickToCopy: true,
      },
      {
        header: "Tanggal Pendaftaran",
        accessorKey: "TanggalPendaftaran",
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
        Cell: ({ cell }) => <StatusBadge status={cell.getValue() as string} />,
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
        title="Module Data Haki"
        showCreateButton
        createButtonTitle="Data Haki"
        link="haki/tambah"
      />
      <Card header="SEMUA DATA PENGAJUAN HAKI" className="mt-[30px]">
        <BaseTable data={DATA_HAKI} columns={columns} />
      </Card>
    </>
  );
};

export default UserManagement;
