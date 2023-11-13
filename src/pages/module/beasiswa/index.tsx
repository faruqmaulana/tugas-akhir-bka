/* eslint-disable @typescript-eslint/require-await */
import { type MRT_ColumnDef } from "material-react-table";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { requireAuth } from "~/common/authentication/requireAuth";
import { Anchor } from "~/common/components/ui/anchor";
import StatusBadge from "~/common/components/ui/badge/StatusBagde";
import ButtonLink from "~/common/components/ui/button/ButtonLink";
import ViewDetailButton from "~/common/components/ui/button/ViewDetailButton";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { tableActionConfig } from "~/common/config/TABLE_CONFIG";
import { type PengajuanBeasiswa } from "~/common/constants/module/PENGAJUAN_BEASISWA";
import { api } from "~/utils/api";

// export const getServerSideProps = requireAuth(async (ctx) => {
//   return { props: {} };
// });

const UserManagement = () => {
  const router = useRouter();
  const { data } = api.scholarshipModule.getAllScholarship.useQuery();

  const columns = useMemo<MRT_ColumnDef<PengajuanBeasiswa>[]>(
    () => [
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
        header: "Deskripsi",
        accessorKey: "deskripsi",
        enableClickToCopy: true,
      },
      {
        header: "Dokumen",
        accessorKey: "dokumenPendukung",
        enableClickToCopy: true,
        Cell: ({ cell }) => (
          <Anchor href={cell.getValue() as string}>
            <ButtonLink />
          </Anchor>
        ),
      },
      {
        header: "Tanggal Pengajuan",
        accessorKey: "tanggalPengajuan",
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
              const id: string = props.row.original.id;
              const transformUrl = router.pathname.split("/").join("/");
              void router.push(`${transformUrl}/detail/${id}`);
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
        title="Module Pengajuan Beasiswa"
        showCreateButton
        createButtonTitle="Pengajuan Beasiswa"
        link="/module/beasiswa/tambah"
      />
      <Card header="DATA PENGAJUAN BEASISWA" className="mt-[30px]">
        <BaseTable data={data} columns={columns} />
      </Card>
    </>
  );
};

export default UserManagement;
