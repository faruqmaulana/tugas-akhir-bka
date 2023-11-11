/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { PatenAndHaki } from "@prisma/client";
import { validateFile } from "../pengajuan-prestasi.shema";

export const hakiApplicationSchema = z.object({
  judul: z.string().min(1, "Required"),
  keterangan: z.string().min(1, "Required"),
  dokumenPendukung: validateFile.refine((fileList) => fileList.length > 0, {
    message: "File is required!",
  }),
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
  jenis: z.nativeEnum(PatenAndHaki),
});

export type IHakiApplicationSchema = z.infer<typeof hakiApplicationSchema>;
