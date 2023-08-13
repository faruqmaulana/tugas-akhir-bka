import * as z from "zod";

export const loginInformation = z.object({
  email: z.string(),
  name: z.string().min(1, { message: "Nama tidak boleh kosong" }),
  password: z.string(),
});

export type ILoginInformation = z.infer<typeof loginInformation>;
