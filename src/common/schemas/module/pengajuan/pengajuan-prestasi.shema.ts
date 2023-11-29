/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z, ZodError, type ZodIssue } from "zod";
// Define a union type for string and object
// const StringOrObject = z.union([z.string(), z.object()]);

const imageMimeTypes = ["image/jpeg", "image/png"];
const pdfMimeType = "application/pdf";

export const validateFile = z.any().refine(
  (value) => {
    // Check if the file has a valid MIME type
    // And valid file type
    if (value && typeof value === "object" && (value as File).length > 0) {
      const isValidMimeType =
        imageMimeTypes.includes((value as File[])[0]?.type as string) ||
        (value as File[])[0]?.type === pdfMimeType;
      return isValidMimeType;
    }
    return true;
  },
  {
    message: "File type must be an image (JPEG, PNG) or a PDF.",
  }
);

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
    orkemId: z.string().optional(),
    tingkatKejuaraanId: z
      .string()
      .min(1, { message: "Pilih tingkat kejuaraan!" }),
    tingkatPrestasiId: z
      .string()
      .min(1, { message: "Pilih tingkat prestasi!" }),
    piagamPenghargaan: validateFile,
    fotoPenyerahanPiala: validateFile,
    undanganKejuaraan: validateFile,
    dokumenPendukung: validateFile,
    currentUserName: z.string(),
    custom: z.string().optional(),
    prestasiDataTableId: z.string().optional(),
    catatan: z.string().optional(),
    status: z.string().optional(),
    suratKeputusanId: z.string().nullable(),
  })
  .refine((data) => {
    const filledFields = [
      data.piagamPenghargaan,
      data.fotoPenyerahanPiala,
      data.undanganKejuaraan,
      data.dokumenPendukung,
    ];

    const atLeastOneFieldFilled =
      filledFields.some((field) => field && field?.length > 0) ||
      filledFields.some((field) => field?.bytes);
    const msg = [
      { path: ["custom"], message: "Minimal satu form harus terisi" },
    ] as ZodIssue[];

    if (!atLeastOneFieldFilled) {
      throw new ZodError(msg);
    }

    return true;
  });

export type IPengajuanPrestasiForm = z.infer<typeof pengajuanPrestasiForm>;

export const uploadFileForm = z.object({
  piagamPenghargaan: validateFile,
});

export type IuploadFileForm = z.infer<typeof uploadFileForm>;
