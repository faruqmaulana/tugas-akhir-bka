import { z } from "zod";

export const lecturerSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nama tidak boleh kosong!"),
  nidn: z.string().min(1, "Required!"),
  prodiId: z.string().min(1, "Required!"),
});

export type IlecturerSchema = z.infer<typeof lecturerSchema>;