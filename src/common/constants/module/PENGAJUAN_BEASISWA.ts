export type PengajuanBeasiswa = {
  id: string;
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
