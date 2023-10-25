/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { validateFile } from "../pengajuan-prestasi.shema";

export const hakiApplicationSchema = z.object({
  judul: z.string().min(1, "Required"),
  keterangan: z.string().min(1, "Required"),
  // dokumenPendukung: validateFile.refine((fileList) => fileList.length > 0, {
  //   message: "File is required!",
  // }),
  dokumenPendukung: validateFile,
  users: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
        role: z.string(),
        isKetua: z.boolean(),
      })
    )
    .min(1, "Required!"),
});

export type IHakiApplicationSchema = z.infer<typeof hakiApplicationSchema>;
