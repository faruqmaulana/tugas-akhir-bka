import { type Prisma } from "@prisma/client";
export const stringToJSON = (data: string | undefined) => {
  if (!data || typeof data === "object") undefined;

  return JSON.parse(data!) as Prisma.JsonObject;
};

export const JSONtoString = (
  data: Prisma.JsonObject | undefined | null
): string | undefined | null => {
  if (!data) undefined;

  return JSON.stringify(data);
};
