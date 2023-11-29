/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { validateFile } from "../pengajuan-prestasi.shema";

export const approveBookSchema = z.object({
  id: z.string().min(1, "Required"),
  suratKeputusanId: z.string().nullable(),
  nomorISBN: z.string().min(1, "Required"),
  tahunTerbit: z.date().refine((date) => {
    if (!date) {
      throw new Error("Tahun terbit is required.");
    }
    return true;
  }),
  nomorSK: z.string().min(1, { message: "Required!" }),
  tanggalSK: z.date().refine((date) => {
    if (!date) {
      throw new Error("Tanggal is required.");
    }
    return true;
  }),
  dokumenSK: validateFile.refine((fileList) => fileList.length > 0, {
    message: "File is required!",
  }),
  catatan: z.string().min(1, "Required"),
});

export type IApproveBookForm = z.infer<typeof approveBookSchema>;
