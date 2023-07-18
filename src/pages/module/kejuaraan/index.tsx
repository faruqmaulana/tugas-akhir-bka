import { type MRT_ColumnDef } from "material-react-table";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import ViewDetailButton from "~/common/components/ui/button/ViewDetailButton";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { tableActionConfig } from "~/common/config/TABLE_CONFIG";
import {
  DUMMY_KEJUARAAN,
  type KejuaraanData,
} from "~/common/constants/DUMMY_KEJUARAAN";
import { handleBgColor } from "~/common/helpers/handleBgColor";

const UserManagement = () => {
  const router = useRouter();

  const columns = useMemo<MRT_ColumnDef<KejuaraanData>[]>(
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
        header: "Nama",
        accessorKey: "nama",
        enableClickToCopy: true,
      },
      {
        header: "Nomor SK",
        accessorKey: "noSK",
        enableClickToCopy: true,
      },
      {
        header: "Tanggal SK",
        accessorKey: "tanggalSK",
        enableClickToCopy: true,
      },
      {
        header: "Kegiatan",
        accessorKey: "kegiatan",
        enableClickToCopy: true,
      },
      {
        header: "Tanggal Kegiatan",
        accessorKey: "tanggalKegiatan",
        enableClickToCopy: true,
      },
      {
        header: "Penyelenggara",
        accessorKey: "penyelenggara",
        enableClickToCopy: true,
      },
      {
        header: "ORKEM",
        accessorKey: "orkem",
        enableClickToCopy: true,
      },
      {
        header: "Tingkat Kejuaraan",
        accessorKey: "tingkatKejuaraan",
        enableClickToCopy: true,
      },
      {
        header: "Tingkat Prestasi",
        accessorKey: "tingkatPrestasi",
        enableClickToCopy: true,
      },
      {
        header: "Dosen Pembimbing",
        accessorKey: "dosen",
        enableClickToCopy: true,
      },
      {
        header: "Piagam Penghargaan",
        accessorKey: "piagamPenghargaan",
        enableClickToCopy: true,
      },
      {
        header: "Foto Penyerahan Piala",
        accessorKey: "fotoPenyerahanPiala",
        enableClickToCopy: true,
      },
      {
        header: "Undangan Kejuaraan",
        accessorKey: "undanganKejuaraan",
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
      <PageHeading title="Module Prestasi Lomba & Kejuaraan" showCreateButton />
      <Card
        header={"DATA Prestasi Lomba & Kejuaraan".toUpperCase()}
        className="mt-[30px]"
      >
        <BaseTable data={DUMMY_KEJUARAAN} columns={columns} />
      </Card>
    </>
  );
};

export default UserManagement;
