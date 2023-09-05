/* eslint-disable @typescript-eslint/require-await */
import { type MRT_ColumnDef } from "material-react-table";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { requireAuth } from "~/common/authentication/requireAuth";
import StatusBadge from "~/common/components/ui/badge/StatusBagde";
import ViewDetailButton from "~/common/components/ui/button/ViewDetailButton";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { tableActionConfig } from "~/common/config/TABLE_CONFIG";
import { type KejuaraanData } from "~/common/constants/DUMMY_KEJUARAAN";
import { useKejuaraan } from "~/common/hooks/module/kejuaraan/useKejuaraan";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const UserManagement = () => {
  const router = useRouter();
  const { allKejuaraan } = useKejuaraan();
  const transformedData = allKejuaraan as KejuaraanData[];
  const columns = useMemo<MRT_ColumnDef<KejuaraanData>[]>(
    () => [
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
        header: "Penyerahan Piala",
        accessorKey: "fotoPenyerahanPiala",
        enableClickToCopy: true,
      },
      {
        header: "Undangan Kejuaraan",
        accessorKey: "undanganKejuaraan",
        enableClickToCopy: true,
      },
      {
        header: "Keterangan",
        accessorKey: "keterangan",
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
        Cell: (props) => (
          <ViewDetailButton
            onClick={() => {
              const id = props.row.original.id;
              const transformUrl = router.pathname.split("/").join("/");
              void router.push(transformUrl + "/detail/" + id);
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
        title="Module Prestasi Lomba & Kejuaraan"
        showCreateButton
        link="/module/kejuaraan/tambah"
      />
      <Card
        header={"DATA Prestasi Lomba & Kejuaraan".toUpperCase()}
        className="mt-[30px]"
      >
        <BaseTable data={transformedData} columns={columns} />
      </Card>
    </>
  );
};

export default UserManagement;
