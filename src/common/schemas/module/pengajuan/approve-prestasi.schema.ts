import { z } from "zod";

export const approvePrestasiForm = z.object({
  prestasiDataTableId: z.string().min(1, { message: "Required!" }),
  noSK: z.string().min(1, { message: "Required!" }),
  tanggalSK: z.date().refine((date) => {
    if (!date) {
      throw new Error("Tanggal kegiatan is required.");
    }
    return true;
  }),
  catatan: z.string().min(1, { message: "Required!" }),
});

export type IApprovePrestasiForm = z.infer<typeof approvePrestasiForm>;
