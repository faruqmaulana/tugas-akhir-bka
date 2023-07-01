import dynamic from "next/dynamic";
import React from "react";
import Card from "~/common/components/ui/card/Card";
import Loader from "~/common/components/ui/loader/Loader";

const TableExample = dynamic(
  () => import("~/common/components/ui/table/PrestasiTable"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const UserManagement = () => {
  return (
    <Card header="DATA PRESTASI MAHASISWA TAHUN 2023" className="mt-[30px]">
      <TableExample />
    </Card>
  );
};

export default UserManagement;
