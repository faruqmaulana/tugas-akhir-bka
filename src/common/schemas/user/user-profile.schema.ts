import { z } from "zod";

const validatePhone = (value: string) => {
  const re = /^[0-9\b]+$/;
  if (!value || value.length < 9 || value.length > 12 || !re.test(value)) {
    return "Invalid indonesian phone number";
  }
  return true;
};

export const userProfileForm = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong!"),
  npm: z.string(),
  phone: z.string().refine((value) => validatePhone(value) === true, {
    message: "Invalid Indonesian phone number",
  }),
  semester: z.string(),
  alamat: z.string(),
  prodiId: z.string(),
});

export type IUserProfileForm = z.infer<typeof userProfileForm>;
