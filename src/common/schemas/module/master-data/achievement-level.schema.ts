import { z } from "zod";

export const achievementLevelSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Required!'),
});

export type IAchievementLevelSchema = z.infer<typeof achievementLevelSchema>;
