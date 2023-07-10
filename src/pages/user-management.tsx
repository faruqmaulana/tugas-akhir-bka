import dynamic from "next/dynamic";
import React from "react";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import Loader from "~/common/components/ui/loader/Loader";

const MahasiswaTable = dynamic(
  () => import("~/common/components/ui/table/MahasiswaTable"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

const UserManagement = () => {
  return (
    <>
      <PageHeading />
      <Card header="DATA MAHASISWA" className="mt-[30px]">
        <MahasiswaTable />
      </Card>
    </>
  );
};

export default UserManagement;
