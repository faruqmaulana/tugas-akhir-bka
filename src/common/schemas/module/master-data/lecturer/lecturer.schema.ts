import { z } from "zod";

export const lecturerSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nama tidak boleh kosong!"),
  nidn: z.string().min(1),
  prodiId: z.string().min(1),
});

export type IlecturerSchema = z.infer<typeof lecturerSchema>;
