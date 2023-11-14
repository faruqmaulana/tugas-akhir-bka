/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { validateFile } from "../pengajuan-prestasi.shema";

export const globalPKMSchema = z.object({
  judul: z.string().min(1, "Required"),
  deskripsi: z.string().min(1, "Required"),
  dosenId: z.string().min(1, { message: "Required!" }),
  users: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
        role: z.string(),
        isKetua: z.boolean(),
      })
    )
    .min(1, "Required!"),
  tanggalKegiatan: z.date().refine((date) => {
    if (!date) {
      throw new Error("Tanggal kegiatan is required.");
    }
    return true;
  }),
});

export const createPKMSchema = globalPKMSchema.extend({
  dokumenProposal: validateFile.refine((fileList) => fileList.length > 0, {
    message: "File is required!",
  }),
});

export const editPKMSchema = globalPKMSchema.extend({
  PengajuanPKMId: z.string(),
  catatan: z.string(),
  dokumenProposal: validateFile,
});

export type IEditPKMSchema = z.infer<typeof editPKMSchema>;
export type IcreatePKMSchema = z.infer<typeof createPKMSchema>;
