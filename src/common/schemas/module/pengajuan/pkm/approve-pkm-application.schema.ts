/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { validateFile } from "../pengajuan-prestasi.shema";

export const approvePKMApplicationSchema = z.object({
  PengajuanPKMId: z.string(),
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
