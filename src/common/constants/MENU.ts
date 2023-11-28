/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Role } from "@prisma/client";

import {
  BookIcon,
  DashboardIcon,
  MasterDataIcon,
  UserManagementIcon,
} from "~/common/components/svg";

export type SubMenuItem = {
  id: number;
  title: string;
  url: string;
  module: string;
};

export type MenuItemType = {
  id: number;
  title: string;
  url: string;
  module: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isOpen?: boolean;
  type?: string;
  submenu?: SubMenuItem[];
  counter?: number;
  authorization?: Role[];
};

const LIST_MENU: MenuItemType[] = [
  {
    id: 1,
    title: "Dashboard",
    url: "/dashboard",
    module: "dashboard",
    icon: DashboardIcon,
    authorization: [Role.ADMIN, Role.MAHASISWA],
  },
  {
    id: 2,
    title: "User Management",
    url: "/user-management",
    module: "user-management",
    icon: UserManagementIcon,
    authorization: [Role.ADMIN],
  },
  {
    id: 3,
    title: "Master Data",
    type: "Master Data",
    module: "master-data",
    url: "",
    icon: MasterDataIcon,
    isOpen: false,
    authorization: [Role.ADMIN],
    submenu: [
      {
        id: 40,
        title: "Beasiswa",
        url: "/master-data/beasiswa",
        module: "Dosen",
      },
      {
        id: 41,
        title: "Dosen",
        url: "/master-data/dosen",
        module: "Dosen",
      },
      {
        id: 42,
        title: "Fakultas",
        url: "/master-data/fakultas",
        module: "branch",
      },
      {
        id: 46,
        title: "Prodi",
        url: "/master-data/prodi",
        module: "branch",
      },
      {
        id: 47,
        title: "Organisasi Kemahasiswaan",
        url: "/master-data/organisasi-kemahasiswaan",
        module: "shift",
      },
      {
        id: 43,
        title: "Tingkat Kejuaraan",
        url: "/master-data/tingkat-kejuaraan",
        module: "shift",
      },
      {
        id: 44,
        title: "Tingkat Prestasi",
        url: "/master-data/tingkat-prestasi",
        module: "check-point",
      },
      {
        id: 7,
        title: "SK Rektor",
        module: "cabang-sample-data",
        url: "/module/sk-rektor",
      },
    ],
  },
  {
    id: 7,
    title: "SK Rektor",
    type: "Petugas Cabang",
    module: "cabang-sample-data",
    url: "/module/sk-rektor",
    icon: BookIcon,
    counter: 10,
    authorization: [Role.ADMIN],
  },
  {
    id: 4,
    title: "Prestasi Lomba & Kejuaraan",
    type: "Petugas Cabang",
    module: "cabang-sample-data",
    url: "/module/kejuaraan",
    icon: BookIcon,
    counter: 44,
  },
  {
    id: 5,
    title: "Program Kreativitas Mahasiswa",
    type: "Petugas Cabang",
    module: "cabang-sample-data",
    url: "/module/pkm",
    icon: BookIcon,
    counter: 28,
  },
  {
    id: 6,
    title: "Beasiswa",
    type: "Petugas Cabang",
    module: "cabang-sample-data",
    url: "/module/beasiswa",
    icon: BookIcon,
    counter: 20,
  },
  {
    id: 8,
    title: "Haki",
    type: "Petugas Cabang",
    module: "cabang-sample-data",
    url: "/module/haki",
    icon: BookIcon,
    counter: 3,
  },
  {
    id: 9,
    title: "Paten",
    type: "Petugas Cabang",
    module: "cabang-sample-data",
    url: "/module/paten",
    icon: BookIcon,
    counter: 5,
  },
  {
    id: 10,
    title: "Buku",
    type: "Petugas Cabang",
    module: "cabang-sample-data",
    url: "/module/buku",
    icon: BookIcon,
    counter: 30,
  },
];

export default LIST_MENU;
