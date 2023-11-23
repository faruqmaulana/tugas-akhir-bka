/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { validateFile } from "../pengajuan-prestasi.shema";

export const createBookSchema = z.object({
  judulBuku: z.string().min(1, "Required"),
  penerbit: z.string().min(1, "Required"),
  pengarang: z.string().min(1, "Required!"),
  penulis: z.string().min(1, "Required!"),
  jumlahEksemplar: z.string().min(1, "Required!"),
  dokumenPendukung: validateFile.refine((fileList) => fileList.length > 0, {
    message: "File is required!",
  }),
});

export type ICreateBookForm = z.infer<typeof createBookSchema>;
