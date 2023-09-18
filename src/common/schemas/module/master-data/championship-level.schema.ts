import { z } from "zod";

export const championshipLevelSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Required!"),
});

export type IChampionshipLevelSchema = z.infer<typeof championshipLevelSchema>;
