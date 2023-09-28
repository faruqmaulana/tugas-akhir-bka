import { z } from "zod";

function validateIndonesianPhoneNumber(value: string) {
  const re = /^[0-9\b]+$/;
  value.length;
  if (!value || value.length < 9 || value.length > 12 || !re.test(value)) {
    return "Invalid Indonesian phone number";
  }
  return true;
}

export const registerSchema = z.object({
  name: z.string().min(1, "Required!"),
  npm: z.string().min(1, "Required!"),
  email: z.string().email("Required!"),
  phone: z
    .string()
    .refine((value) => validateIndonesianPhoneNumber(value) === true, {
      message: "Harap masukkan nomor telepon Indonesia yang valid",
    }),
  password: z.string().min(1, "Required!"),
});

export type IRegisterSchema = z.infer<typeof registerSchema>;
