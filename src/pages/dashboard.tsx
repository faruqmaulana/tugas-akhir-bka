import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Card from "~/common/components/ui/card/Card";
import Header from "~/common/components/ui/header/Header";
import Loader from "~/common/components/ui/loader/Loader";
import { CHART_DATA } from "~/common/constants/CHART";

const MyResponsiveLine = dynamic(
  () => import("~/common/components/ui/chart/LineChart"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);
const TableExample = dynamic(
  () => import("~/common/components/ui/table/PrestasiTable"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

export default function Home() {
  return (
    <>
      <Header title="Dashboard" className="mb-[20px]" />
      <Card header="STATISTIK DATA PRESTASI" headerClassName="-mb-5">
        <MyResponsiveLine data={CHART_DATA.reverse()} />
      </Card>
      <Card header="DATA PRESTASI MAHASISWA TAHUN 2023" className="mt-[30px]">
        <TableExample />
      </Card>
    </>
  );
}
