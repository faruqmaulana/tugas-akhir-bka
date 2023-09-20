/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
import { type MRT_ColumnDef } from "material-react-table";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { requireAuth } from "~/common/authentication/requireAuth";
import Card from "~/common/components/ui/card/Card";
import PageHeading from "~/common/components/ui/header/PageHeading";
import Loader from "~/common/components/ui/loader/Loader";
import BaseTable from "~/common/components/ui/table/BaseTable";
import { type KejuaraanData } from "~/common/constants/DUMMY_KEJUARAAN";
import { STATUS } from "~/common/enums/STATUS";
import { useDashboard } from "~/common/hooks/module/dashboard/useDashboard";
import { type BarResultType } from "~/server/api/module/statistic/getAchievementByFaculty.handler";
import { api } from "~/utils/api";

const MyResponsiveBar = dynamic(
  () => import("~/common/components/ui/chart/BarChart"),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

export default function Home() {
  const { data } = useDashboard();
  const { data: allKejuaraan } = api.prestasiLomba.getAllKejuaraan.useQuery(
    STATUS.APPROVE
  );

  const columns = useMemo<MRT_ColumnDef<KejuaraanData>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "nama",
        enableClickToCopy: true,
      },
      {
        header: "Fakultas",
        accessorKey: "fakultas",
      },
      {
        header: "Prestasi",
        accessorKey: "tingkatPrestasi",
      },
      {
        header: "Tingkat Kegiatan",
        accessorKey: "tingkatKejuaraan",
      },
      {
        header: "Nama Kegiatan",
        accessorKey: "kegiatan",
      },
    ],
    []
  );

  return (
    <>
      <PageHeading />
      <Card
        header="RAIHAN MEDALI MAHASISWA UNTAG TAHUN 2023 (PER FAKULTAS)"
        headerClassName="-mb-5"
      >
        <MyResponsiveBar
          legendLeftTitle="Jumlah Prestasi"
          legendBottomTitle="Fakultas"
          indexBy="name"
          keys={(data as BarResultType)?.keys}
          data={(data as BarResultType)?.barData}
        />
      </Card>
      <Card header="DATA PRESTASI MAHASISWA TAHUN 2023" className="mt-[30px]">
        <BaseTable data={allKejuaraan} columns={columns} />
      </Card>
    </>
  );
}
