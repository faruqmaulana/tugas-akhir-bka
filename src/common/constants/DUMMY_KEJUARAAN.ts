export type KejuaraanData = {
  status: "Disetujui" | "Ditolak" | "Diajukan Ulang" | "Sedang Diproses";
  id: string;
  nama: string;
  noSK: string;
  tanggalSK: string;
  kegiatan: string;
  fakultas: string;
  tanggalKegiatan: string;
  penyelenggara: string;
  isValidated: boolean;
  validatedAt: string | null;
  createdAt: string;
  orkem: string;
  tingkatKejuaraan: string;
  tingkatPrestasi: string;
  dosen: string;
  keterangan?: string;
  piagamPenghargaan: string; // URL gambar publik
  fotoPenyerahanPiala: string; // URL gambar publik
  undanganKejuaraan: string; // URL text PDF publik
  dokumenPendukung: string; // URL text PDF publik
};
