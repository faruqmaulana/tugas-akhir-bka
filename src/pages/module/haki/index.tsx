/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type MRT_ColumnDef } from "material-react-table";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import StatusBadge from "~/common/components/ui/badge/StatusBagde";
import ViewDetailButton from "~/common/components/ui/button/ViewDetailButton";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { tableActionConfig } from "~/common/config/TABLE_CONFIG";
import { type HAKI } from "~/common/constants/DUMMY_PATEN_HAKI";
import { api } from "~/utils/api";
import { PatenAndHaki } from "@prisma/client";
import { Anchor } from "~/common/components/ui/anchor";
import ButtonLink from "~/common/components/ui/button/ButtonLink";
import { useCurrentUser } from "~/common/hooks/module/profile";

const UserManagement = () => {
  const router = useRouter();
  const { isAdmin } = useCurrentUser();
  const { data } = api.hakiModule.getAllPatenAndHaki.useQuery({
    type: PatenAndHaki.HAKI,
  });

  const columns = useMemo<MRT_ColumnDef<HAKI>[]>(
    () => [
      {
        header: "Judul",
        accessorKey: "judul",
        enableClickToCopy: true,
        Cell: ({ cell }) => (
          <div className="small-scrollbar max-w-[450px] overflow-x-auto">
            <p>{cell.getValue() as string}</p>
          </div>
        ),
      },
      {
        header: "Diajukan oleh",
        accessorKey: "pengajuHaki",
        enableClickToCopy: true,
      },
      {
        header: "Nomor Haki",
        accessorKey: "nomorPaten",
        enableClickToCopy: true,
      },
      {
        header: "Jenis",
        accessorKey: "jenis",
        enableClickToCopy: true,
      },
      {
        header: "Deskripsi",
        accessorKey: "keterangan",
        enableClickToCopy: true,
      },
      {
        header: "Tanggal Pendaftaran",
        accessorKey: "tanggalPendaftaran",
        enableClickToCopy: true,
      },
      {
        header: "Masa Berlaku",
        accessorKey: "validPeriod",
        enableClickToCopy: true,
      },
      {
        header: "Tanggal Kadaluarsa",
        accessorKey: "tanggalKadaluarsa",
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
        header: "Dokumen Haki",
        accessorKey: "dokumenTambahan",
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
        title="Module Data Haki"
        showCreateButton={!isAdmin}
        createButtonTitle="Data Haki"
        link="haki/tambah"
      />

      <Card header="SEMUA DATA PENGAJUAN HAKI" className="mt-[30px]">
        <BaseTable data={data} columns={columns} />
      </Card>
    </>
  );
};

export default UserManagement;
