/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { validateImage } from "../module/pengajuan/pengajuan-prestasi.shema";

const validatePhone = (value: string) => {
  const re = /^[0-9\b]+$/;
  if (!value || value.length < 9 || value.length > 12 || !re.test(value)) {
    return "Invalid indonesian phone number";
  }
  return true;
};

export const userProfileForm = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong!"),
  npm: z.string().min(1, "NBI tidak boleh kosong!"),
  phone: z.string().refine((value) => validatePhone(value) === true, {
    message: "Invalid Indonesian phone number",
  }),
  semester: z.string().min(1, "Semester tidak boleh kosong!"),
  alamat: z.string(),
  prodiId: z.string(),
});

export const adminProfileForm = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong!"),
  npm: z.string().optional(),
  phone: z.string().refine((value) => validatePhone(value) === true, {
    message: "Invalid Indonesian phone number",
  }),
  semester: z.string().optional(),
  alamat: z.string(),
  prodiId: z.string().optional(),
});

export const userProfilePhoto = z.object({
  profilePhoto: validateImage.refine((fileList) => fileList.length > 0, {
    message: "File is required!",
  }),
});

export type IUserProfileForm = z.infer<typeof userProfileForm>;
export type IAdminProfileForm = z.infer<typeof adminProfileForm>;
export type IUserProfilePhoto = z.infer<typeof userProfilePhoto>;
