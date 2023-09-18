import { z } from "zod";

export const studentOrganizationSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Required!"),
});

export type IStudentOrganizationSchema = z.infer<
  typeof studentOrganizationSchema
>;
