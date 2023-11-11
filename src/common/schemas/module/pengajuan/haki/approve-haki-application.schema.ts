/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { validateFile } from "../pengajuan-prestasi.shema";
import { PatenAndHaki } from "@prisma/client";

export const approveHakiApplicationSchema = z.object({
  patenAndHakiTableId: z.string(),
  nomorPaten: z.string().min(1, "Required!"),
  expiredDate: z.date().refine((date) => {
    if (!date) {
      throw new Error("Harap masukkan tanggal kadaluarsa.");
    }
    return true;
  }),
  catatan: z.string(),
  dokumenTambahan: validateFile.refine((fileList) => fileList.length > 0, {
    message: "File is required!",
  }),
  jenis: z.nativeEnum(PatenAndHaki),
});

export const rejectHakiForm = z.object({
  patenAndHakiTableId: z.string().min(1, { message: "Required!" }),
  catatan: z.string().min(1, { message: "Required!" }),
  jenis: z.nativeEnum(PatenAndHaki),
});

export type IRejectHakiForm = z.infer<typeof rejectHakiForm>;

export type IApproveHakiApplicationSchema = z.infer<
  typeof approveHakiApplicationSchema
>;
