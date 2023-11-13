/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { validateFile } from "../pengajuan-prestasi.shema";

export const createPKMSchema = z.object({
  judul: z.string().min(1, "Required"),
  deskripsi: z.string().min(1, "Required"),
  dokumenProposal: validateFile.refine((fileList) => fileList.length > 0, {
    message: "File is required!",
  }),
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

export type IcreatePKMSchema = z.infer<typeof createPKMSchema>;
