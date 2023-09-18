import { z } from "zod";

export const facultySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
});

export type IFacultySchema = z.infer<typeof facultySchema>;