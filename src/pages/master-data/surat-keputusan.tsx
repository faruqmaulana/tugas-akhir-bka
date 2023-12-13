/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useMemo } from "react";

import { type MRT_ColumnDef } from "material-react-table";
import BaseTable from "~/common/components/ui/table/BaseTable";
import PageHeading from "~/common/components/ui/header/PageHeading";
import { type DokumenSkType } from "~/server/api/module/master-data/dokumen-sk/getAllDokumenSK.handler";
import ButtonLink from "~/common/components/ui/button/ButtonLink";
import { Anchor } from "~/common/components/ui/anchor";
import { api } from "~/utils/api";

const Example = () => {
  const { data } = api.dokumenSKQuery.getAllDokumenSK.useQuery();

  const columns = useMemo<MRT_ColumnDef<DokumenSkType>[]>(
    () => [
      {
        header: "Nomor SK",
        accessorKey: "nomorSK",
        enableClickToCopy: true,
      },
      {
        header: "Tanggal SK",
        accessorKey: "tanggalSK",
        enableClickToCopy: true,
      },
      {
        header: "Tanggal Upload",
        accessorKey: "tanggalUpload",
        enableClickToCopy: true,
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
    ],
    [data]
  );

  return (
    <>
      <PageHeading
        title="Data Dokumen Surat Keputusan"
        showCreateButton={false}
      />
      <BaseTable data={data} columns={columns} />
    </>
  );
};

export default Example;
