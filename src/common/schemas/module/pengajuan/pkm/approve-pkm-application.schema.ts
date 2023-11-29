/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { validateFile } from "../pengajuan-prestasi.shema";

export const approvePKMApplicationSchema = z.object({
  PengajuanPKMId: z.string(),
  suratKeputusanId: z.string().nullable(),
  totalAnggaran: z.string(),
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
  catatan: z.string(),
});

export const rejectPKMForm = z.object({
  PengajuanPKMId: z.string().min(1, { message: "Required!" }),
  catatan: z.string().min(1, { message: "Required!" }),
});

export type IRejectPKMForm = z.infer<typeof rejectPKMForm>;

export type IApprovePKMApplicationSchema = z.infer<
  typeof approvePKMApplicationSchema
>;
