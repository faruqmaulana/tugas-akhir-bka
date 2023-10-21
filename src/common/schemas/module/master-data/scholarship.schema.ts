import { z } from "zod";
import { validateFile } from "../pengajuan/pengajuan-prestasi.shema";

export const scholarshipSchema = z.object({
  id: z.string(),
  syarat: z.string(),
  templateFormulir: validateFile,
});

export type IScholarshipSchema = z.infer<typeof scholarshipSchema>;
