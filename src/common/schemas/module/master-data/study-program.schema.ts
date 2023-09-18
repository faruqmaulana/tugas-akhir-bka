import { z } from "zod";

export const studyProgramSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Required!"),
  fakultasId: z.string().min(1, "Required!"),
});

export type IStudyProgramSchema = z.infer<typeof studyProgramSchema>;
