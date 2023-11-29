import { z } from "zod";
import { validateFile } from "../pengajuan/pengajuan-prestasi.shema";

export const scholarshipSchema = z.object({
  id: z.string(),
  syarat: z.string().min(1, 'Required'),
  templateFormulir: validateFile,
});

export type IScholarshipSchema = z.infer<typeof scholarshipSchema>;
