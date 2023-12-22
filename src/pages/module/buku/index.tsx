/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import { useCurrentUser } from "~/common/hooks/module/profile";
import { type AllBooksType } from "~/server/api/module/pengajuan/book/getBooks.handler";
import { api } from "~/utils/api";

const UserManagement = () => {
  const router = useRouter();
  const { isAdmin } = useCurrentUser();
  const { data } = api.bookModule.getBooks.useQuery();

  const columns = useMemo<MRT_ColumnDef<AllBooksType>[]>(
    () => [
      {
        header: "Judul Buku",
        accessorKey: "judulBuku",
        enableClickToCopy: true,
      },
      {
        header: "Nomor ISBN",
        accessorKey: "nomorISBN",
        enableClickToCopy: true,
      },
      {
        header: "Penulis",
        accessorKey: "penulis",
        enableClickToCopy: true,
      },
      {
        header: "Pengarang",
        accessorKey: "pengarang",
        enableClickToCopy: true,
      },
      {
        header: "Tahun Terbit",
        accessorKey: "tahunTerbit",
        enableClickToCopy: true,
      },
      {
        header: "Jumlah Eksemplar",
        accessorKey: "jumlahEksemplar",
        enableClickToCopy: true,
      },
      {
        header: "Tahun Terbit",
        accessorKey: "tahunTerbit",
        enableClickToCopy: true,
      },
      {
        header: "Dokumen Pendukung",
        accessorKey: "dokumenPendukung",
        enableClickToCopy: false,
        Cell: ({ cell }) => (
          <Anchor href={cell.getValue() as string}>
            <ButtonLink />
          </Anchor>
        ),
      },
      {
        header: "Dokumen SK",
        accessorKey: "dokumenSK",
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
        title="Module Buku"
        showCreateButton={!isAdmin}
        createButtonTitle="Buku"
        link="/module/buku/tambah"
      />
      <Card header="DATA BUKU" className="mt-[30px]">
        <BaseTable data={data} columns={columns} />
      </Card>
    </>
  );
};

export default UserManagement;
