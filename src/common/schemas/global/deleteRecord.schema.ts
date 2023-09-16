import { z } from "zod";

export const deleteRecord = z.object({
  id: z.string(),
});

export type IDeleteRecord = z.infer<typeof deleteRecord>;
