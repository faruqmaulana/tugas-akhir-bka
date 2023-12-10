import * as z from "zod";

function validateIndonesianPhoneNumber(value: string) {
  const re = /^[0-9\b]+$/;
  value.length;
  if (!value || value.length < 9 || value.length > 12 || !re.test(value)) {
    return "Invalid Indonesian phone number";
  }
  return true;
}

export const loginSchema = z.object({
  npm: z.string().min(1, { message: "Required" }),
  password: z.string().min(8, { message: "Kata sandi harus 8 digit" }),
});

export const signUpSchema = loginSchema.extend({
  name: z.string(),
  phone: z
    .string()
    .refine((value) => validateIndonesianPhoneNumber(value) === true, {
      message: "Harap masukkan nomor telepon Indonesia yang valid",
    }),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;
