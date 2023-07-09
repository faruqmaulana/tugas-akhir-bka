/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BookIcon,
  DashboardIcon,
  MasterDataIcon,
  RoleManagementIcon,
  UserManagementIcon,
} from "~/common/components/svg";

const LIST_MENU: any = [
  {
    id: 1,
    title: "Dashboard",
    url: "/dashboard",
    module: "dashboard",
    icon: DashboardIcon,
  },
  {
    id: 3,
    title: "User Management",
    url: "/user-management",
    module: "user-management",
    icon: UserManagementIcon,
  },
  {
    id: 4,
    title: "Master Data",
    type: "",
    module: "master-data",
    url: "",
    icon: MasterDataIcon,
    isOpen: false,
    submenu: [
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
        id: 45,
        title: "Status Pengajuan",
        url: "/master-data/status-pengajuan",
        module: "consumption",
      },
    ],
  },
  // {
  //   id: 5,
  //   title: "Sample Data",
  //   type: "Petugas Cabang",
  //   module: "cabang-sample-data",
  //   url: "",
  //   icon: BookIcon,
  //   isOpen: false,
  //   submenu: [
  //     {
  //       id: 51,
  //       title: "Today's Data",
  //       url: "/sample-data/today?type=petugasCabang",
  //       module: "todays-data",
  //     },
  //     {
  //       id: 52,
  //       title: "History Data",
  //       url: "/sample-data/history?type=petugasCabang",
  //       module: "history-data",
  //     },
  //   ],
  // },
  // {
  //   id: 6,
  //   title: "Sample Data",
  //   type: "Penerima Sample",
  //   module: "penerima-sample-data",
  //   url: "",
  //   icon: BookIcon,
  //   isOpen: false,
  //   submenu: [
  //     {
  //       id: 61,
  //       title: "Today's Data",
  //       url: "/sample-data/today?type=penerimaSample",
  //       module: "todays-data",
  //     },
  //     {
  //       id: 62,
  //       title: "History Data",
  //       url: "/sample-data/history?type=penerimaSample",
  //       module: "history-data",
  //     },
  //   ],
  // },
  // {
  //   id: 7,
  //   title: "Sample Data",
  //   type: "Penyusun Sample",
  //   module: "penyusun-sample-data",
  //   url: "",
  //   icon: BookIcon,
  //   isOpen: false,
  //   submenu: [
  //     {
  //       id: 71,
  //       title: "Today's Data",
  //       url: "/sample-data/today?type=penyusunSample",
  //       module: "todays-data",
  //     },
  //     {
  //       id: 72,
  //       title: "Pending Data",
  //       url: "/sample-data/pending?type=penyusunSample",
  //       module: "pending-data",
  //     },
  //     {
  //       id: 73,
  //       title: "History Data",
  //       url: "/sample-data/history?type=penyusunSample",
  //       module: "history-data",
  //     },
  //   ],
  // },
  // {
  //   id: 8,
  //   title: "Sample Data",
  //   type: "Room 1",
  //   module: "room1-sample-data",
  //   url: "",
  //   icon: BookIcon,
  //   isOpen: false,
  //   submenu: [
  //     {
  //       id: 81,
  //       title: "Today's Data",
  //       url: "/sample-data/today?type=room1",
  //       module: "todays-data",
  //     },
  //     {
  //       id: 82,
  //       title: "Pending Data",
  //       url: "/sample-data/pending?type=room1",
  //       module: "pending-data",
  //     },
  //     {
  //       id: 83,
  //       title: "History Data",
  //       url: "/sample-data/history?type=room1",
  //       module: "history-data",
  //     },
  //   ],
  // },
  // {
  //   id: 9,
  //   title: "Sample Data",
  //   type: "Room 2",
  //   module: "room2-sample-data",
  //   url: "",
  //   icon: BookIcon,
  //   isOpen: false,
  //   submenu: [
  //     {
  //       id: 91,
  //       title: "Today's Data",
  //       url: "/sample-data/today?type=room2",
  //       module: "todays-data",
  //     },
  //     {
  //       id: 92,
  //       title: "Pending Data",
  //       url: "/sample-data/pending?type=room2",
  //       module: "pending-data",
  //     },
  //     {
  //       id: 93,
  //       title: "History Data",
  //       url: "/sample-data/history?type=room2",
  //       module: "history-data",
  //     },
  //   ],
  // },
  // {
  //   id: 11,
  //   title: "Sample Data",
  //   type: "Room 3",
  //   module: "room3-sample-data",
  //   url: "",
  //   icon: BookIcon,
  //   isOpen: false,
  //   submenu: [
  //     {
  //       id: 111,
  //       title: "Today's Data",
  //       url: "/sample-data/today?type=room3",
  //       module: "todays-data",
  //     },
  //     {
  //       id: 112,
  //       title: "Pending Data",
  //       url: "/sample-data/pending?type=room3",
  //       module: "pending-data",
  //     },
  //     {
  //       id: 113,
  //       title: "Reupload Data",
  //       url: "/sample-data/reupload?type=room3",
  //       module: "reupload-data",
  //     },
  //     {
  //       id: 114,
  //       title: "History Data",
  //       url: "/sample-data/history?type=room3",
  //       module: "history-data",
  //     },
  //   ],
  // },
  // {
  //   id: 12,
  //   title: "Sample Data",
  //   type: "Doctor Approval",
  //   module: "doctor-sample-data",
  //   url: "",
  //   icon: BookIcon,
  //   isOpen: false,
  //   submenu: [
  //     {
  //       id: 121,
  //       title: "Today's Data",
  //       url: "/sample-data/today?type=doctorApproval",
  //       module: "todays-data",
  //     },
  //     {
  //       id: 123,
  //       title: "History Data",
  //       url: "/sample-data/history?type=doctorApproval",
  //       module: "history-data",
  //     },
  //   ],
  // },
  // {
  //   id: 13,
  //   title: "Sample Data",
  //   type: "Customer Service",
  //   module: "cs-sample-data",
  //   url: "",
  //   icon: BookIcon,
  //   isOpen: false,
  //   submenu: [
  //     {
  //       id: 131,
  //       title: "Today's Data",
  //       url: "/sample-data/today?type=customerService",
  //       module: "todays-data",
  //     },
  //   ],
  // },
];

export default LIST_MENU;
