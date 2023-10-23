/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { validateFile } from "../pengajuan-prestasi.shema";

export const editscholarshipApplicationSchema = z.object({
  pengajuanBeasiswaId: z.string().optional(),
  catatan: z.string().optional(),
  dokumen: validateFile,
  description: z.string().min(1, "Required!"),
});

export type IEditScholarshipApplicationSchema = z.infer<
  typeof editscholarshipApplicationSchema
>;
