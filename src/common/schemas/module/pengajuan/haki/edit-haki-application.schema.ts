import { z } from "zod";
import { validateFile } from "../pengajuan-prestasi.shema";
import { PatenAndHaki } from "@prisma/client";

export const editHakiForm = z.object({
  judul: z.string().min(1, "Required"),
  keterangan: z.string().min(1, "Required"),
  dokumenPendukung: validateFile,
  // users: z.any(),
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
  patenAndHakiTableId: z.string().min(1, { message: "Required!" }),
  catatan: z.string().min(1, { message: "Required!" }),
  jenis: z.nativeEnum(PatenAndHaki),
});

export type IEditHakiForm = z.infer<typeof editHakiForm>;
