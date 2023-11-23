/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { validateFile } from "../pengajuan-prestasi.shema";

export const editBookSchema = z.object({
  id: z.string().min(1, "Required"),
  judulBuku: z.string().min(1, "Required"),
  dokumenPendukung: validateFile,
  penerbit: z.string().min(1, "Required"),
  pengarang: z.string().min(1, "Required!"),
  penulis: z.string().min(1, "Required!"),
  jumlahEksemplar: z.string().min(1, "Required!"),
  catatan: z.string().min(1, "Required!"),
});

export type IEditBookForm = z.infer<typeof editBookSchema>;
