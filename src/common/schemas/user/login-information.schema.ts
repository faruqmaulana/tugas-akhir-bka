import { z } from "zod";

type PasswordType = {
  password: string;
  newPassword: string;
  passwordConfirmation: string;
};

function isOldPasswordRequired(data: PasswordType): boolean {
  if (
    (data.newPassword !== "" || data.passwordConfirmation !== "") &&
    data.password === ""
  ) {
    return false;
  }
  return true;
}

function doPasswordsMatch(data: PasswordType): boolean {
  return data.password === "" || data.newPassword === data.passwordConfirmation;
}

function isPasswordNotEmpty(data: PasswordType): boolean {
  return data.password !== ""
    ? data.newPassword !== "" || data.passwordConfirmation !== ""
    : true;
}

export const loginInformation = z
  .object({
    name: z.string().min(1, { message: "Nama tidak boleh kosong" }),
    email: z.string(),
    password: z.string(),
    newPassword: z.string(),
    passwordConfirmation: z.string(),
    customErrorPassword: z.string().optional(),
    requireOldPassword: z.string().optional(),
  })
  .refine(isOldPasswordRequired, {
    message: "Old password is required when setting a new password",
    path: ["requireOldPassword"],
  })
  .refine(doPasswordsMatch, {
    message: "Passwords don't match",
    path: ["customErrorPassword"],
  })
  .refine(isPasswordNotEmpty, {
    message: "required",
    path: ["customErrorPassword"],
  });

export type ILoginInformation = z.infer<typeof loginInformation>;
