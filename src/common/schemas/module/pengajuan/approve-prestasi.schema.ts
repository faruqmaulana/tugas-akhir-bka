import { z } from "zod";

export const rejectPrestasiForm = z.object({
  prestasiDataTableId: z.string().min(1, { message: "Required!" }),
  catatan: z.string().min(1, { message: "Required!" }),
});

export const approvePrestasiForm = rejectPrestasiForm.extend({
  noSK: z.string().min(1, { message: "Required!" }),
  tanggalSK: z.date().refine((date) => {
    if (!date) {
      throw new Error("Tanggal kegiatan is required.");
    }
    return true;
  }),
});

export type IApprovePrestasiForm = z.infer<typeof approvePrestasiForm>;
export type IRejectPrestasiForm = z.infer<typeof rejectPrestasiForm>;
