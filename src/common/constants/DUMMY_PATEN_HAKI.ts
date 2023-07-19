// Tipe untuk data HAKI
export type HAKI = {
  Jenis: string;
  Judul: string;
  NomorPendaftaran: string;
  PemegangHAKI: string;
  Pencipta: string;
  Deskripsi: string;
  TanggalPendaftaran: string;
  MasaBerlaku: string;
  DaerahPerlindungan: string;
  Status: string;
  NBI: string;
  Semester: number;
  Prodi: string;
  Fakultas: string;
  Dosen: string;
};

// Tipe untuk data Paten
type Paten = {
  Jenis: string;
  JudulPaten: string;
  NomorPaten: string;
  PemegangPaten: string;
  PenulisPenemu: string;
  Abstrak: string;
  Klaim: string;
  Gambar: string;
  Klasifikasi: string;
  TanggalPengajuan: string;
  TanggalDiberikan: string;
  MasaBerlaku: string;
  DaerahPerlindungan: string;
  Status: string;
  NBI: string;
  Semester: number;
  Prodi: string;
  Fakultas: string;
  Dosen: string;
};

export const DATA_HAKI: HAKI[] = [
  {
    Jenis: "Hak Cipta",
    Judul: "Kerajaan Rindu Angin",
    NomorPendaftaran: "HC202301",
    PemegangHAKI: "Penerbit Fiksi Ajaib",
    Pencipta: "Linda Penulis",
    Deskripsi:
      "Novel ini mengisahkan petualangan seorang pemuda yang menemukan kekuatan elemen magis.",
    TanggalPendaftaran: "2023-07-19",
    MasaBerlaku: "20 tahun",
    DaerahPerlindungan: "Indonesia",
    Status: "Aktif",
    NBI: "123456789",
    Semester: 6,
    Prodi: "Sastra Indonesia",
    Fakultas: "Fakultas Ilmu Budaya",
    Dosen: "Prof. Dr. Budi Sastrawan",
  },
  {
    Jenis: "Hak Cipta",
    Judul: "Euforia Warna",
    NomorPendaftaran: "HC202302",
    PemegangHAKI: "Galeri Seni Kreatif",
    Pencipta: "Rina Pelukis",
    Deskripsi:
      "Lukisan abstrak dengan kombinasi warna-warna cerah yang menarik.",
    TanggalPendaftaran: "2023-07-20",
    MasaBerlaku: "15 tahun",
    DaerahPerlindungan: "Indonesia",
    Status: "Aktif",
    NBI: "987654321",
    Semester: 5,
    Prodi: "Seni Rupa",
    Fakultas: "Fakultas Seni Rupa dan Desain",
    Dosen: "Dr. Indra Kusuma",
  },
  {
    Jenis: "Hak Cipta",
    Judul: "Harmoni Alam",
    NomorPendaftaran: "HC202303",
    PemegangHAKI: "Band Harmony Earth",
    Pencipta: "Rizky Komposer",
    Deskripsi: "Album musik indie dengan tema alam dan lingkungan.",
    TanggalPendaftaran: "2023-07-21",
    MasaBerlaku: "10 tahun",
    DaerahPerlindungan: "Indonesia",
    Status: "Aktif",
    NBI: "456789123",
    Semester: 7,
    Prodi: "Musik",
    Fakultas: "Fakultas Seni Pertunjukan",
    Dosen: "Dra. Siti Musikus",
  },
];

export const DATA_PATEN: Paten[] = [
  {
    Jenis: "Paten",
    JudulPaten: "Robot Pembersih Otomatis",
    NomorPaten: "PT202301",
    PemegangPaten: "TeknoTech Solutions",
    PenulisPenemu: "Budi Inventor",
    Abstrak:
      "Patent ini menggambarkan robot otomatis untuk membersihkan rumah.",
    Klaim: "Robot pembersih otomatis dengan kemampuan pembersihan menyeluruh.",
    Gambar: "gambar_robot.jpg",
    Klasifikasi: "B25D 3/00",
    TanggalPengajuan: "2023-07-19",
    TanggalDiberikan: "2023-12-15",
    MasaBerlaku: "20 tahun",
    DaerahPerlindungan: "Indonesia",
    Status: "Aktif",
    NBI: "246813579",
    Semester: 8,
    Prodi: "Teknik Elektro",
    Fakultas: "Fakultas Teknik",
    Dosen: "Dr. Ir. Susilo Teknologi",
  },
  {
    Jenis: "Paten",
    JudulPaten: "Obat Antivirus Baru",
    NomorPaten: "PT202302",
    PemegangPaten: "Farmasi Hebat",
    PenulisPenemu: "Diana Peneliti",
    Abstrak:
      "Patent ini menggambarkan obat antivirus yang efektif melawan penyakit tertentu.",
    Klaim: "Obat antivirus baru dengan mekanisme aksi unik.",
    Gambar: "gambar_obat.jpg",
    Klasifikasi: "A61K 31/00",
    TanggalPengajuan: "2023-07-20",
    TanggalDiberikan: "2023-12-16",
    MasaBerlaku: "15 tahun",
    DaerahPerlindungan: "Indonesia",
    Status: "Aktif",
    NBI: "135792468",
    Semester: 4,
    Prodi: "Farmasi",
    Fakultas: "Fakultas Kedokteran",
    Dosen: "Prof. Dr. Fitria Farmasista",
  },
];

export const HAKI_TABLE_HEADER = [
  {
    header: "Jenis",
    accessorKey: "Jenis",
    enableClickToCopy: true,
  },
  {
    header: "Judul",
    accessorKey: "Judul",
    enableClickToCopy: true,
  },
  {
    header: "Nomor Pendaftaran",
    accessorKey: "NomorPendaftaran",
    enableClickToCopy: true,
  },
  {
    header: "Pemegang HAKI",
    accessorKey: "PemegangHAKI",
    enableClickToCopy: true,
  },
  {
    header: "Pencipta",
    accessorKey: "Pencipta",
    enableClickToCopy: true,
  },
  {
    header: "Deskripsi",
    accessorKey: "Deskripsi",
    enableClickToCopy: true,
  },
  {
    header: "Tanggal Pendaftaran",
    accessorKey: "TanggalPendaftaran",
    enableClickToCopy: true,
  },
  {
    header: "Masa Berlaku",
    accessorKey: "MasaBerlaku",
    enableClickToCopy: true,
  },
  {
    header: "Daerah Perlindungan",
    accessorKey: "DaerahPerlindungan",
    enableClickToCopy: true,
  },
  {
    header: "Status",
    accessorKey: "Status",
    enableClickToCopy: true,
  },
  {
    header: "NBI",
    accessorKey: "NBI",
    enableClickToCopy: true,
  },
  {
    header: "Semester",
    accessorKey: "Semester",
    enableClickToCopy: true,
  },
  {
    header: "Prodi",
    accessorKey: "Prodi",
    enableClickToCopy: true,
  },
  {
    header: "Fakultas",
    accessorKey: "Fakultas",
    enableClickToCopy: true,
  },
  {
    header: "Dosen",
    accessorKey: "Dosen",
    enableClickToCopy: true,
  },
];

export const PATEN_TABLE_HEADER = [
  {
    header: "Jenis",
    accessorKey: "Jenis",
    enableClickToCopy: true,
  },
  {
    header: "Judul Paten",
    accessorKey: "JudulPaten",
    enableClickToCopy: true,
  },
  {
    header: "Nomor Paten",
    accessorKey: "NomorPaten",
    enableClickToCopy: true,
  },
  {
    header: "Pemegang Paten",
    accessorKey: "PemegangPaten",
    enableClickToCopy: true,
  },
  {
    header: "Penulis Penemu",
    accessorKey: "PenulisPenemu",
    enableClickToCopy: true,
  },
  {
    header: "Abstrak",
    accessorKey: "Abstrak",
    enableClickToCopy: true,
  },
  {
    header: "Klaim",
    accessorKey: "Klaim",
    enableClickToCopy: true,
  },
  {
    header: "Gambar",
    accessorKey: "Gambar",
    enableClickToCopy: true,
  },
  {
    header: "Klasifikasi",
    accessorKey: "Klasifikasi",
    enableClickToCopy: true,
  },
  {
    header: "Tanggal Pengajuan",
    accessorKey: "TanggalPengajuan",
    enableClickToCopy: true,
  },
  {
    header: "Tanggal Diberikan",
    accessorKey: "TanggalDiberikan",
    enableClickToCopy: true,
  },
  {
    header: "Masa Berlaku",
    accessorKey: "MasaBerlaku",
    enableClickToCopy: true,
  },
  {
    header: "Daerah Perlindungan",
    accessorKey: "DaerahPerlindungan",
    enableClickToCopy: true,
  },
  {
    header: "Status",
    accessorKey: "Status",
    enableClickToCopy: true,
  },
  {
    header: "NBI",
    accessorKey: "NBI",
    enableClickToCopy: true,
  },
  {
    header: "Semester",
    accessorKey: "Semester",
    enableClickToCopy: true,
  },
  {
    header: "Prodi",
    accessorKey: "Prodi",
    enableClickToCopy: true,
  },
  {
    header: "Fakultas",
    accessorKey: "Fakultas",
    enableClickToCopy: true,
  },
  {
    header: "Dosen",
    accessorKey: "Dosen",
    enableClickToCopy: true,
  },
];

export const HAKI_FORM = [
  {
    key: "Jenis",
    className: "col-span-1",
    placeholder: "Jenis Hak Kekayaan Intelektual",
    label: "Jenis Hak Kekayaan Intelektual",
    value: DATA_HAKI[0]?.Jenis,
  },
  {
    key: "Judul",
    className: "col-span-1",
    placeholder: "Judul",
    label: "Judul",
    value: DATA_HAKI[0]?.Judul,
  },
  {
    key: "NomorPendaftaran",
    className: "col-span-1",
    placeholder: "Nomor Pendaftaran",
    label: "Nomor Pendaftaran",
    value: DATA_HAKI[0]?.NomorPendaftaran,
  },
  {
    key: "PemegangHAKI",
    className: "col-span-1",
    placeholder: "Pemegang HAKI",
    label: "Pemegang HAKI",
    value: DATA_HAKI[0]?.PemegangHAKI,
  },
  {
    key: "Pencipta",
    className: "col-span-1",
    placeholder: "Pencipta",
    label: "Pencipta",
    value: DATA_HAKI[0]?.Pencipta,
  },
  {
    key: "Deskripsi",
    className: "col-span-1",
    placeholder: "Deskripsi",
    label: "Deskripsi",
    value: DATA_HAKI[0]?.Deskripsi,
  },
  {
    key: "TanggalPendaftaran",
    className: "col-span-1",
    placeholder: "Tanggal Pendaftaran",
    label: "Tanggal Pendaftaran",
    value: DATA_HAKI[0]?.TanggalPendaftaran,
  },
  {
    key: "MasaBerlaku",
    className: "col-span-1",
    placeholder: "Masa Berlaku",
    label: "Masa Berlaku",
    value: DATA_HAKI[0]?.MasaBerlaku,
  },
  {
    key: "DaerahPerlindungan",
    className: "col-span-1",
    placeholder: "Daerah Perlindungan",
    label: "Daerah Perlindungan",
    value: DATA_HAKI[0]?.DaerahPerlindungan,
  },
  {
    key: "NBI",
    className: "col-span-1",
    placeholder: "NBI",
    label: "NBI",
    value: DATA_HAKI[0]?.NBI,
  },
  {
    key: "Semester",
    className: "col-span-1",
    placeholder: "Semester",
    label: "Semester",
    value: DATA_HAKI[0]?.Semester,
  },
  {
    key: "Prodi",
    className: "col-span-1",
    placeholder: "Program Studi",
    label: "Program Studi",
    value: DATA_HAKI[0]?.Prodi,
  },
  {
    key: "Fakultas",
    className: "col-span-1",
    placeholder: "Fakultas",
    label: "Fakultas",
    value: DATA_HAKI[0]?.Fakultas,
  },
  {
    key: "Dosen",
    className: "col-span-1",
    placeholder: "Dosen",
    label: "Dosen",
    value: DATA_HAKI[0]?.Dosen,
  },
];

export const PATEN_FORM = [
  {
    key: "Jenis",
    className: "col-span-1",
    placeholder: "Jenis Hak Kekayaan Intelektual",
    label: "Jenis Hak Kekayaan Intelektual",
    value: DATA_PATEN[0]?.Jenis,
  },
  {
    key: "JudulPaten",
    className: "col-span-1",
    placeholder: "Judul Paten",
    label: "Judul Paten",
    value: DATA_PATEN[0]?.JudulPaten,
  },
  {
    key: "NomorPaten",
    className: "col-span-1",
    placeholder: "Nomor Paten",
    label: "Nomor Paten",
    value: DATA_PATEN[0]?.NomorPaten,
  },
  {
    key: "PemegangPaten",
    className: "col-span-1",
    placeholder: "Pemegang Paten",
    label: "Pemegang Paten",
    value: DATA_PATEN[0]?.PemegangPaten,
  },
  {
    key: "PenulisPenemu",
    className: "col-span-1",
    placeholder: "Penulis Penemu",
    label: "Penulis Penemu",
    value: DATA_PATEN[0]?.PenulisPenemu,
  },
  {
    key: "Abstrak",
    className: "col-span-1",
    placeholder: "Abstrak",
    label: "Abstrak",
    value: DATA_PATEN[0]?.Abstrak,
  },
  {
    key: "Klaim",
    className: "col-span-1",
    placeholder: "Klaim",
    label: "Klaim",
    value: DATA_PATEN[0]?.Klaim,
  },
  {
    key: "Gambar",
    className: "col-span-1",
    placeholder: "Gambar",
    label: "Gambar",
    value: DATA_PATEN[0]?.Gambar,
  },
  {
    key: "Klasifikasi",
    className: "col-span-1",
    placeholder: "Klasifikasi",
    label: "Klasifikasi",
    value: DATA_PATEN[0]?.Klasifikasi,
  },
  {
    key: "TanggalPengajuan",
    className: "col-span-1",
    placeholder: "Tanggal Pengajuan",
    label: "Tanggal Pengajuan",
    value: DATA_PATEN[0]?.TanggalPengajuan,
  },
  {
    key: "TanggalDiberikan",
    className: "col-span-1",
    placeholder: "Tanggal Diberikan",
    label: "Tanggal Diberikan",
    value: DATA_PATEN[0]?.TanggalDiberikan,
  },
  {
    key: "MasaBerlaku",
    className: "col-span-1",
    placeholder: "Masa Berlaku",
    label: "Masa Berlaku",
    value: DATA_PATEN[0]?.MasaBerlaku,
  },
  {
    key: "DaerahPerlindungan",
    className: "col-span-1",
    placeholder: "Daerah Perlindungan",
    label: "Daerah Perlindungan",
    value: DATA_PATEN[0]?.DaerahPerlindungan,
  },
  {
    key: "Status",
    className: "col-span-1",
    placeholder: "Status",
    label: "Status",
    value: DATA_PATEN[0]?.Status,
  },
  {
    key: "NBI",
    className: "col-span-1",
    placeholder: "NBI",
    label: "NBI",
    value: DATA_PATEN[0]?.NBI,
  },
  {
    key: "Semester",
    className: "col-span-1",
    placeholder: "Semester",
    label: "Semester",
    value: DATA_PATEN[0]?.Semester,
  },
  {
    key: "Prodi",
    className: "col-span-1",
    placeholder: "Program Studi",
    label: "Program Studi",
    value: DATA_PATEN[0]?.Prodi,
  },
  {
    key: "Fakultas",
    className: "col-span-1",
    placeholder: "Fakultas",
    label: "Fakultas",
    value: DATA_PATEN[0]?.Fakultas,
  },
  {
    key: "Dosen",
    className: "col-span-1",
    placeholder: "Dosen",
    label: "Dosen",
    value: DATA_PATEN[0]?.Dosen,
  },
];
