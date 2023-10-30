/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { validateFile } from "../pengajuan-prestasi.shema";

export const scholarshipApplicationSchema = z.object({
  pengajuanBeasiswaId: z.string().optional(),
  catatan: z.string().optional(),
  dokumen: validateFile.refine((fileList) => fileList.length > 0, {
    message: "File is required!",
  }),
  description: z.string().min(1, "Required!"),
});

export type IScholarshipApplicationSchema = z.infer<
  typeof scholarshipApplicationSchema
>;