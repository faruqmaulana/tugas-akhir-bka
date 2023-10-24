/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { validateFile } from "../pengajuan-prestasi.shema";

export const approveHakiApplicationSchema = z.object({
  expiredDate: z.date().refine((date) => {
    if (!date) {
      throw new Error("Tanggal kegiatan is required.");
    }
    return true;
  }),
  catatan: z.string(),
  dokumenTambahan: validateFile,
});

export type IApproveHakiApplicationSchema = z.infer<
  typeof approveHakiApplicationSchema
>;
