import { type MRT_ColumnDef } from "material-react-table";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { Anchor } from "~/common/components/ui/anchor";
import StatusBadge from "~/common/components/ui/badge/StatusBagde";
import ButtonLink from "~/common/components/ui/button/ButtonLink";
import ViewDetailButton from "~/common/components/ui/button/ViewDetailButton";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { tableActionConfig } from "~/common/config/TABLE_CONFIG";
import { type PkmType } from "~/common/constants/DUMMY_PKM";
import { useCurrentUser } from "~/common/hooks/module/profile";
import { api } from "~/utils/api";

const UserManagement = () => {
  const router = useRouter();
  const { isAdmin } = useCurrentUser();
  const { data } = api.pkmModule.getAllPKM.useQuery();

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
        header: "Proposal",
        accessorKey: "proposal",
        enableClickToCopy: true,
        Cell: ({ cell }) => (
          <Anchor href={cell.getValue() as string}>
            <ButtonLink />
          </Anchor>
        ),
      },
      {
        header: "Total Anggaran",
        accessorKey: "totalAnggaran",
        enableClickToCopy: true,
      },
      {
        header: "Dosen",
        accessorKey: "dosen",
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
        header: "Dokumen SK",
        accessorKey: "suratKeputusan",
        enableClickToCopy: false,
        Cell: ({ cell }) => (
          <Anchor href={cell.getValue() as string}>
            <ButtonLink />
          </Anchor>
        ),
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
        title="Module Program Kreativitas Mahasiswa"
        showCreateButton={!isAdmin}
        createButtonTitle="Program Kreativitas Mahasiswa"
        link="/module/pkm/tambah"
      />
      <Card header="DATA PROGRAM KREATIVITAS MAHASISWA" className="mt-[30px]">
        <BaseTable data={data} columns={columns} />
      </Card>
    </>
  );
};

export default UserManagement;
