/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Role } from "@prisma/client";

import {
  BookIcon,
  DashboardIcon,
  MasterDataIcon,
  UserManagementIcon,
} from "~/common/components/svg";
import { MODULE_TYPE_CODE } from "../enums/MODULE_TYPE_CODE";

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
        id: 44,
        title: "Dokumen SK",
        url: "/master-data/surat-keputusan",
        module: "check-point",
      },
    ],
  },
  {
    id: 4,
    title: "Prestasi Lomba & Kejuaraan",
    type: "Petugas Cabang",
    module: MODULE_TYPE_CODE.KEJUARAAN,
    url: "/module/kejuaraan",
    icon: BookIcon,
    counter: 44,
  },
  {
    id: 5,
    title: "Program Kreativitas Mahasiswa",
    type: "Petugas Cabang",
    module: MODULE_TYPE_CODE.PKM,
    url: "/module/pkm",
    icon: BookIcon,
    counter: 28,
  },
  {
    id: 6,
    title: "Beasiswa",
    type: "Petugas Cabang",
    module: MODULE_TYPE_CODE.BEASISWA,
    url: "/module/beasiswa",
    icon: BookIcon,
    counter: 20,
  },
  {
    id: 8,
    title: "Haki",
    type: "Petugas Cabang",
    module: MODULE_TYPE_CODE.HAKI,
    url: "/module/haki",
    icon: BookIcon,
    counter: 3,
  },
  {
    id: 9,
    title: "Paten",
    type: "Petugas Cabang",
    module: MODULE_TYPE_CODE.PATEN,
    url: "/module/paten",
    icon: BookIcon,
    counter: 5,
  },
  {
    id: 10,
    title: "Buku",
    type: "Petugas Cabang",
    module: MODULE_TYPE_CODE.BUKU,
    url: "/module/buku",
    icon: BookIcon,
    counter: 30,
  },
];

export default LIST_MENU;
