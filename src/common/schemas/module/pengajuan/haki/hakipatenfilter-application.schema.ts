/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { PatenAndHaki } from "@prisma/client";

export const hakiPatenFilterSchema = z.object({
  status: z.string().optional(),
  type: z.nativeEnum(PatenAndHaki),
});

export type IHakiPatenFilterSchema = z.infer<typeof hakiPatenFilterSchema>;
