export type PkmType = {
  npm: string;
  namaMahasiswa: string;
  semester: string;
  prodi: string;
  fakultas: string;
  id: string;
  judul: string;
  deskripsi: string;
  tanggalKegiatan: string;
  isValidated: boolean;
  validatedAt: string;
  createdAt: string;
  lampiran: string;
  totalAnggaran: string;
  anggaranDosen: string;
  status: string;
  Dosen: string;
};

export const DUMMY_PKM: PkmType[] = [
  {
    npm: "123456789",
    namaMahasiswa: "Rudi Santoso",
    semester: "20231",
    prodi: "Teknik Informatika",
    fakultas: "Teknik",
    id: "project-1",
    judul: "Sistem Pendukung Keputusan",
    deskripsi:
      "Mengembangkan aplikasi pendukung keputusan untuk pengambilan keputusan strategis.",
    tanggalKegiatan: "Senin, 2 Oktober 2023",
    isValidated: true,
    validatedAt: "2023-07-20T15:45:00Z",
    createdAt: "2023-07-10T08:10:00Z",
    lampiran: "https://drive.google.com/link-to-lampiran-1",
    totalAnggaran: "Rp. 12.000.000",
    anggaranDosen: "Rp. 2.000.000",
    status: "Disetujui",
    Dosen: "Budi Santoso",
  },
  {
    npm: "987654321",
    namaMahasiswa: "Siti Rahayu",
    semester: "20231",
    prodi: "Akuntansi",
    fakultas: "Ekonomi",
    id: "project-2",
    judul: "Analisis Keuangan Perusahaan",
    deskripsi:
      "Menganalisis kinerja keuangan perusahaan dengan menggunakan rasio keuangan.",
    tanggalKegiatan: "Rabu, 5 Oktober 2023",
    isValidated: true,
    validatedAt: "2023-07-18T11:30:00Z",
    createdAt: "2023-07-05T14:50:00Z",
    lampiran: "https://drive.google.com/link-to-lampiran-2",
    totalAnggaran: "Rp. 10.000.000",
    anggaranDosen: "Rp. 1.500.000",
    status: "Disetujui",
    Dosen: "Anita Wijaya",
  },
  {
    npm: "111111111",
    namaMahasiswa: "Linda Sari",
    semester: "20231",
    prodi: "Kimia",
    fakultas: "MIPA",
    id: "project-3",
    judul: "Studi Pencemaran Udara",
    deskripsi: "Melakukan penelitian tentang pencemaran udara di perkotaan.",
    tanggalKegiatan: "Kamis, 6 Oktober 2023",
    isValidated: false,
    validatedAt: "s",
    createdAt: "2023-07-12T09:05:00Z",
    lampiran: "https://drive.google.com/link-to-lampiran-3",
    totalAnggaran: "Rp. 8.000.000",
    anggaranDosen: "Rp. 1.800.000",
    status: "Ditolak",
    Dosen: "Diana Kartika",
  },
  {
    npm: "222222222",
    namaMahasiswa: "Ahmad Abdullah",
    semester: "20231",
    prodi: "Teknik Elektro",
    fakultas: "Teknik",
    id: "project-4",
    judul: "Desain Sistem Kontrol Otomatis",
    deskripsi:
      "Mendesain sistem kontrol otomatis untuk pengendalian suhu dalam industri.",
    tanggalKegiatan: "Selasa, 10 Oktober 2023",
    isValidated: true,
    validatedAt: "2023-07-25T16:20:00Z",
    createdAt: "2023-07-15T11:30:00Z",
    lampiran: "https://drive.google.com/link-to-lampiran-4",
    totalAnggaran: "Rp. 15.000.000",
    anggaranDosen: "Rp. 2.500.000",
    status: "Disetujui",
    Dosen: "Faisal Rahman",
  },
  {
    npm: "333333333",
    namaMahasiswa: "Dewi Indriani",
    semester: "20231",
    prodi: "Manajemen",
    fakultas: "Ekonomi",
    id: "project-5",
    judul: "Analisis Strategi Pemasaran",
    deskripsi:
      "Menganalisis strategi pemasaran untuk meningkatkan pangsa pasar perusahaan.",
    tanggalKegiatan: "Minggu, 15 Oktober 2023",
    isValidated: true,
    validatedAt: "2023-07-22T09:45:00Z",
    createdAt: "2023-07-18T13:40:00Z",
    lampiran: "https://drive.google.com/link-to-lampiran-5",
    totalAnggaran: "Rp. 8.000.000",
    anggaranDosen: "Rp. 1.200.000",
    status: "Disetujui",
    Dosen: "Diana Kartika",
  },
  {
    npm: "444444444",
    namaMahasiswa: "Rina Sari",
    semester: "20231",
    prodi: "Ilmu Komunikasi",
    fakultas: "Ilmu Sosial dan Politik",
    id: "project-6",
    judul: "Analisis Media Sosial",
    deskripsi:
      "Menganalisis penggunaan media sosial dalam mempengaruhi opini publik.",
    tanggalKegiatan: "Sabtu, 28 Oktober 2023",
    isValidated: true,
    validatedAt: "2023-07-27T12:15:00Z",
    createdAt: "2023-07-20T09:20:00Z",
    lampiran: "https://drive.google.com/link-to-lampiran-6",
    totalAnggaran: "Rp. 6.000.000",
    anggaranDosen: "Rp. 1.000.000",
    status: "Disetujui",
    Dosen: "Andi Susanto",
  },
];

export const PKM_FORM = [
  {
    key: "namaMahasiswa",
    className: "col-span-1",
    placeholder: "Nama Mahasiswa",
    label: "Nama",
    value: "Siti Rahayu",
  },
  {
    key: "npm",
    className: "col-span-1",
    placeholder: "NPM Mahasiswa",
    label: "NPM",
    value: "987654321",
  },
  {
    key: "semester",
    className: "col-span-1",
    placeholder: "Semester Mahasiswa",
    label: "Semester",
    value: "20231",
  },
  {
    key: "prodi",
    className: "col-span-1",
    placeholder: "Program Studi",
    label: "Prodi",
    value: "Akuntansi",
  },
  {
    key: "fakultas",
    className: "col-span-1",
    placeholder: "Fakultas",
    label: "Fakultas",
    value: "Ekonomi",
  },
  {
    key: "judul",
    className: "col-span-1",
    placeholder: "Judul Kegiatan",
    label: "Judul",
    value: "Analisis Keuangan Perusahaan",
  },
  {
    key: "deskripsi",
    className: "col-span-1",
    placeholder: "Deskripsi Kegiatan",
    label: "Deskripsi",
    value:
      "Menganalisis kinerja keuangan perusahaan dengan menggunakan rasio keuangan.",
  },
  {
    key: "Dosen",
    className: "col-span-1",
    placeholder: "Dosen",
    label: "Dosen",
    value: "Anita Wijaya",
  },
  {
    key: "tanggalKegiatan",
    className: "col-span-1",
    placeholder: "Tanggal Kegiatan",
    label: "Tanggal Kegiatan",
    value: "Rabu, 5 Oktober 2023",
  },
  {
    key: "lampiran",
    className: "col-span-1",
    placeholder: "Lampiran",
    label: "Lampiran",
    value: "https://drive.google.com/link-to-lampiran-2",
    type: "file",
  },
  {
    key: "totalAnggaran",
    className: "col-span-1",
    placeholder: "Rp. 2.000.000",
    label: "Ajukan Anggaran",
    value: "Rp. 10.000.000",
  },
];
