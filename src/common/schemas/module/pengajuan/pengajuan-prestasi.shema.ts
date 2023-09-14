/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z, ZodError, type ZodIssue } from "zod";

export const pengajuanPrestasiForm = z
  .object({
    users: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
          isKetua: z.boolean(),
        })
      )
      .min(1, "Required!"),
    dosenId: z.string().min(1, { message: "Required!" }),
    kegiatan: z.string().min(1, { message: "Kegiatan tidak boleh kosong!" }),
    tanggalKegiatan: z.date().refine((date) => {
      if (!date) {
        throw new Error("Tanggal kegiatan is required.");
      }
      return true;
    }),
    penyelenggara: z
      .string()
      .min(1, { message: "Penyelenggara tidak boleh kosong!" }),
    orkemId: z.string().min(1, { message: "Pilih organisasi kemahasiswaan!" }),
    tingkatKejuaraanId: z
      .string()
      .min(1, { message: "Pilih tingkat kejuaraan!" }),
    tingkatPrestasiId: z
      .string()
      .min(1, { message: "Pilih tingkat prestasi!" }),
    piagamPenghargaan: z.string(),
    fotoPenyerahanPiala: z.string(),
    undanganKejuaraan: z.string(),
    dokumenPendukung: z.string(),
    currentUserName: z.string(),
    custom: z.string().optional(),
    prestasiDataTableId: z.string().optional(),
    catatan: z.string().optional(),
    status: z.string().optional(),
  })
  .refine((data) => {
    const filledFields = [
      data.piagamPenghargaan,
      data.fotoPenyerahanPiala,
      data.undanganKejuaraan,
      data.dokumenPendukung,
    ];

    const atLeastOneFieldFilled = filledFields.some((field) => field !== "");

    const msg = [
      { path: ["custom"], message: "Minimal satu form harus terisi" },
    ] as ZodIssue[];

    if (!atLeastOneFieldFilled) {
      throw new ZodError(msg);
    }

    return true;
  });

const imageMimeTypes = ["image/jpeg", "image/png"];
const pdfMimeType = "application/pdf";

export const uploadFileForm = z.object({
  piagamPenghargaan: z.any().refine(
    (value) => {
      // Check if the file has a valid MIME type
      const isValidMimeType =
        imageMimeTypes.includes(value[0].type) || value[0].type === pdfMimeType;
      return isValidMimeType;
    },
    {
      message: "File type must be an image (JPEG, PNG) or a PDF.",
    }
  ),
});

export type IuploadFileForm = z.infer<typeof uploadFileForm>;
export type IPengajuanPrestasiForm = z.infer<typeof pengajuanPrestasiForm>;
