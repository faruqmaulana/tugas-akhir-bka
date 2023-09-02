import { type MRT_ColumnDef } from "material-react-table";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import StatusBadge from "~/common/components/ui/badge/StatusBagde";
import ViewDetailButton from "~/common/components/ui/button/ViewDetailButton";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { tableActionConfig } from "~/common/config/TABLE_CONFIG";
import { DUMMY_PKM, type PkmType } from "~/common/constants/DUMMY_PKM";

const UserManagement = () => {
  const router = useRouter();

  const columns = useMemo<MRT_ColumnDef<PkmType>[]>(
    () => [
      {
        header: "Nama Mahasiswa",
        accessorKey: "namaMahasiswa",
        enableClickToCopy: true,
      },
      {
        header: "NBI",
        accessorKey: "npm",
        enableClickToCopy: true,
      },
      {
        header: "Semester",
        accessorKey: "semester",
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
        header: "Judul",
        accessorKey: "judul",
        enableClickToCopy: true,
      },
      {
        header: "Deskripsi",
        accessorKey: "deskripsi",
        enableClickToCopy: true,
      },
      {
        header: "Tanggal Kegiatan",
        accessorKey: "tanggalKegiatan",
        enableClickToCopy: true,
      },
      {
        header: "Lampiran",
        accessorKey: "lampiran",
        enableClickToCopy: true,
      },
      {
        header: "Total Anggaran",
        accessorKey: "totalAnggaran",
        enableClickToCopy: true,
      },
      // {
      //   header: "Anggaran Dosen",
      //   accessorKey: "anggaranDosen",
      //   enableClickToCopy: true,
      // },
      {
        header: "Dosen",
        accessorKey: "Dosen",
        enableClickToCopy: true,
      },
      {
        header: "Status",
        accessorKey: "status",
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
        title="Module Program Kreativitas Mahasiswa"
        showCreateButton
        createButtonTitle="Program Kreativitas Mahasiswa"
        link="/module/pkm/tambah"
      />
      <Card header="DATA PROGRAM KREATIVITAS MAHASISWA" className="mt-[30px]">
        <BaseTable data={DUMMY_PKM} columns={columns} />
      </Card>
    </>
  );
};

export default UserManagement;
