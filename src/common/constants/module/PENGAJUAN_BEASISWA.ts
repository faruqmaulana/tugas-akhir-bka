export type PengajuanBeasiswa = {
  status: string;
  namaMahasiswa: string;
  prodi: string;
  fakultas: string;
  semester: string;
  dokumenFormulirPengajuan: string;
  deskripsi: string;
  dokumenPendukung: string | string[];
  tanggalPengajuan: string;
  nbi: string;
};

export const PENGAJUAN_BEASISWA: PengajuanBeasiswa[] = [
  {
    status: "Ditolak",
    namaMahasiswa: "Rina Dewi",
    nbi: "1462221454",
    prodi: "Teknik Informatika",
    fakultas: "Teknik",
    semester: "Semester 4",
    dokumenFormulirPengajuan: "https://example.com/dokumen1",
    deskripsi: "Lorem Ipsum",
    dokumenPendukung: "https://example.com/dokumen1",
    tanggalPengajuan: "Jumat, 21 April 2023 pukul 10.30",
  },
  {
    status: "Disetujui",
    namaMahasiswa: "Andi Firmansyah",
    nbi: "1462221454",
    prodi: "Akuntansi",
    fakultas: "Ekonomi",
    semester: "Semester 6",
    dokumenFormulirPengajuan: "https://example.com/dokumen2",
    deskripsi: "Lorem Ipsum",
    dokumenPendukung: "https://example.com/dokumen2",
    tanggalPengajuan: "Kamis, 20 April 2023 pukul 14.45",
  },
  {
    status: "Ditolak",
    namaMahasiswa: "Siti Nurhayati",
    nbi: "1462221454",
    prodi: "Kedokteran",
    fakultas: "Kedokteran",
    semester: "Semester 8",
    dokumenFormulirPengajuan: "https://example.com/dokumen3",
    deskripsi: "Lorem Ipsum",
    dokumenPendukung: "https://example.com/dokumen3",
    tanggalPengajuan: "Senin, 17 April 2023 pukul 09.15",
  },
  {
    status: "Diajukan Ulang",
    namaMahasiswa: "Budi Santoso",
    nbi: "1462221454",
    prodi: "Manajemen",
    fakultas: "Ekonomi",
    semester: "Semester 5",
    dokumenFormulirPengajuan: "https://example.com/dokumen4",
    deskripsi: "Lorem Ipsum",
    dokumenPendukung: "https://example.com/dokumen4",
    tanggalPengajuan: "Rabu, 19 April 2023 pukul 11.30",
  },
  {
    status: "Disetujui",
    namaMahasiswa: "Dewi Indah",
    nbi: "1462221454",
    prodi: "Psikologi",
    fakultas: "Ilmu Sosial dan Ilmu Politik",
    semester: "Semester 7",
    dokumenFormulirPengajuan: "https://example.com/dokumen5",
    deskripsi: "Lorem Ipsum",
    dokumenPendukung: "https://example.com/dokumen5",
    tanggalPengajuan: "Selasa, 18 April 2023 pukul 13.00",
  },
];

export const BEASISWA_FORM = [
  {
    key: "nama",
    className: "col-span-1",
    placeholder: "Nama Mahasiswa",
    label: "Nama",
    value: PENGAJUAN_BEASISWA[0]?.namaMahasiswa,
  },
  {
    key: "noSK",
    className: "col-span-1",
    placeholder: "No SK",
    label: "No SK",
    value: PENGAJUAN_BEASISWA[0]?.nbi,
  },
  {
    key: "prodi",
    className: "col-span-1",
    placeholder: "Program Studi",
    label: "Program Studi",
    value: PENGAJUAN_BEASISWA[0]?.prodi,
  },
  {
    key: "fakultas",
    className: "col-span-1",
    placeholder: "Fakultas",
    label: "Fakultas",
    value: PENGAJUAN_BEASISWA[0]?.fakultas,
  },
  {
    key: "semester",
    className: "col-span-1",
    placeholder: "Semester",
    label: "Semester",
    value: PENGAJUAN_BEASISWA[0]?.semester,
  },
  {
    key: "deskripsi",
    className: "col-span-1",
    placeholder: "Deskripsi",
    label: "Deskripsi",
    value: PENGAJUAN_BEASISWA[0]?.deskripsi,
  },
  {
    key: "dokumenFormulirPengajuan",
    className: "col-span-1",
    placeholder: "Dokumen Formulir Pengajuan",
    label: "Dokumen Formulir Pengajuan",
    type: "file",
    value: PENGAJUAN_BEASISWA[0]?.dokumenFormulirPengajuan,
  },
  {
    key: "dokumenPendukung",
    className: "col-span-1",
    placeholder: "Dokumen Pendukung",
    label: "Dokumen Pendukung",
    type: "file",
    value: PENGAJUAN_BEASISWA[0]?.dokumenPendukung,
  },
];
