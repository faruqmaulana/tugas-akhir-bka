import { z } from "zod";

type LampiranType = {
  piagamPenghargaan?: string;
  fotoPenyerahanPiala?: string;
  undanganKejuaraan?: string;
  dokumenPendukung?: string;
};

function atLeastOneFieldFilled(value: LampiranType) {
  return (
    value.piagamPenghargaan ||
    value.fotoPenyerahanPiala ||
    value.undanganKejuaraan ||
    value.dokumenPendukung
  );
}

export const pengajuanPrestasiForm = z
  .object({
    userId: z.string().min(1, "Pilih mahasiswa!"),
    kegiatan: z.string().min(1, "Kegiatan tidak boleh kosong!"),
    tanggalKegiatan: z.date(),
    penyelenggara: z.string().min(1, "Penyelenggara tidak boleh kosong!"),
    dosenId: z.string().min(1, "Pilih dosen pembimbing!"),
    orkemId: z.string().min(1, "Pilih organisasi kemasiswaan!"),
    tingkatKejuaraanId: z.string().min(1, "Pilih tingakat kejuaraan!"),
    tingkatPrestasiId: z.string().min(1, "Pilih tingkat prestasi!"),
    piagamPenghargaan: z.string(),
    fotoPenyerahanPiala: z.string(),
    undanganKejuaraan: z.string(),
    dokumenPendukung: z.string(),
    atLeastOneFilled: z.string().optional(),
  })
  .refine(atLeastOneFieldFilled, {
    message: "At least one of the specified fields must be filled!",
    path: ["atLeastOneFilled"],
  });
export type IPengajuanPrestasiForm = z.infer<typeof pengajuanPrestasiForm>;
