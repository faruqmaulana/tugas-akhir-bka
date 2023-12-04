export type PkmType = {
  npm: string;
  namaMahasiswa: string;
  id: string;
  judul: string;
  deskripsi: string;
  tanggalKegiatan: string;
  proposal: string;
  totalAnggaran: string;
  status: string;
  dosen: string;
  noSK?: string;
  tanggalSK?: string;
  suratKeputusan?: string;
};

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
