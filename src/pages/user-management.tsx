/* eslint-disable @typescript-eslint/require-await */
import { type MRT_ColumnDef } from "material-react-table";
import React, { useMemo } from "react";
import { requireAuth } from "~/common/authentication/requireAuth";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { useUserManagement } from "~/common/hooks/module/user-management/useUserManagement";
import { type allStudentTableType } from "~/server/api/module/user/user";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const UserManagement = () => {
  const { allStudents } = useUserManagement();

  const columns = useMemo<MRT_ColumnDef<allStudentTableType>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        enableClickToCopy: true,
      },
      {
        header: "Email",
        accessorKey: "email",
        enableClickToCopy: true,
      },
      {
        header: "Phone",
        accessorKey: "phone",
        enableClickToCopy: true,
      },
      {
        accessorKey: "npm",
        header: "NBI",
      },
      {
        header: "Fakultas",
        accessorKey: "fakultas",
      },
      {
        accessorKey: "prodi",
        header: "prodi",
      },
      {
        accessorKey: "semester",
        header: "Semester",
      },
      {
        accessorKey: "total_prestasi",
        header: "Total Prestasi",
      },
    ],
    []
  );
  return (
    <>
      <PageHeading />
      <Card header="DATA MAHASISWA" className="mt-[30px]">
        <BaseTable columns={columns} data={allStudents} />
      </Card>
    </>
  );
};

export default UserManagement;
