import { z } from "zod";

export const rejectBookSchema = z.object({
  id: z.string().min(1, { message: "Required!" }),
  catatan: z.string().min(1, { message: "Required!" }),
});

export type IRejectBookForm = z.infer<typeof rejectBookSchema>;
