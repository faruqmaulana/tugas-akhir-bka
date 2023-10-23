import { z } from "zod";

export const rejectScholarshipForm = z.object({
  pengajuanBeasiswaId: z.string().min(1, { message: "Required!" }),
  catatan: z.string().min(1, { message: "Required!" }),
});

export type IRejectScholarshipForm = z.infer<typeof rejectScholarshipForm>;
