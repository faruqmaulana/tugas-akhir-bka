/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";

export const mahasiswaManagementForm = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nama tidak boleh kosong!"),
  email: z.string().min(1, "Required!").email(),
  npm: z.string().min(1, "NBI tidak boleh kosong!"),
  semester: z.string().min(1, "Semester tidak boleh kosong!"),
  prodiId: z.string(),
  password: z.string().min(1, "Required!"),
});

export const adminManagementForm = z.object({
  name: z.string().min(1, "Required!"),
  email: z.string().min(1, "Required!").email(),
  password: z.string().min(1, "Required!"),
});

export type IAdminManagementForm = z.infer<typeof adminManagementForm>;
export type IMahasiswaManagementForm = z.infer<typeof mahasiswaManagementForm>;
