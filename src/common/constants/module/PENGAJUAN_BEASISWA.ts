export type PengajuanBeasiswa = {
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
    namaMahasiswa: "Rina Dewi",
    prodi: "Teknik Informatika",
    fakultas: "Teknik",
    semester: "Semester 4",
    dokumenFormulirPengajuan: "https://example.com/dokumen1",
    deskripsi: "Lorem Ipsum",
    dokumenPendukung: "https://example.com/dokumen1",
    tanggalPengajuan: "Jumat, 21 April 2023 pukul 10.30",
    nbi: "1462221454",
  },
  {
    namaMahasiswa: "Andi Firmansyah",
    prodi: "Akuntansi",
    fakultas: "Ekonomi",
    semester: "Semester 6",
    dokumenFormulirPengajuan: "https://example.com/dokumen2",
    deskripsi: "Lorem Ipsum",
    dokumenPendukung: "https://example.com/dokumen2",
    tanggalPengajuan: "Kamis, 20 April 2023 pukul 14.45",
    nbi: "1462221454",
  },
  {
    namaMahasiswa: "Siti Nurhayati",
    prodi: "Kedokteran",
    fakultas: "Kedokteran",
    semester: "Semester 8",
    dokumenFormulirPengajuan: "https://example.com/dokumen3",
    deskripsi: "Lorem Ipsum",
    dokumenPendukung: "https://example.com/dokumen3",
    tanggalPengajuan: "Senin, 17 April 2023 pukul 09.15",
    nbi: "1462221454",
  },
  {
    namaMahasiswa: "Budi Santoso",
    prodi: "Manajemen",
    fakultas: "Ekonomi",
    semester: "Semester 5",
    dokumenFormulirPengajuan: "https://example.com/dokumen4",
    deskripsi: "Lorem Ipsum",
    dokumenPendukung: "https://example.com/dokumen4",
    tanggalPengajuan: "Rabu, 19 April 2023 pukul 11.30",
    nbi: "1462221454",
  },
  {
    namaMahasiswa: "Dewi Indah",
    prodi: "Psikologi",
    fakultas: "Ilmu Sosial dan Ilmu Politik",
    semester: "Semester 7",
    dokumenFormulirPengajuan: "https://example.com/dokumen5",
    deskripsi: "Lorem Ipsum",
    dokumenPendukung: "https://example.com/dokumen5",
    tanggalPengajuan: "Selasa, 18 April 2023 pukul 13.00",
    nbi: "1462221454",
  },
];
