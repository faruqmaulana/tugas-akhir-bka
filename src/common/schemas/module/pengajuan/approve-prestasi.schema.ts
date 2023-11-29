/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { validateFile } from "./pengajuan-prestasi.shema";

export const rejectPrestasiForm = z.object({
  prestasiDataTableId: z.string().min(1, { message: "Required!" }),
  catatan: z.string().min(1, { message: "Required!" }),
});

export const approvePrestasiForm = rejectPrestasiForm.extend({
  suratKeputusanId: z.string().nullable(),
  nomorSK: z.string().min(1, { message: "Required!" }),
  tanggalSK: z.date().refine((date) => {
    if (!date) {
      throw new Error("Tanggal kegiatan is required.");
    }
    return true;
  }),
  dokumenSK: validateFile.refine((fileList) => fileList.length > 0, {
    message: "File is required!",
  }),
});

export type IApprovePrestasiForm = z.infer<typeof approvePrestasiForm>;
export type IRejectPrestasiForm = z.infer<typeof rejectPrestasiForm>;
