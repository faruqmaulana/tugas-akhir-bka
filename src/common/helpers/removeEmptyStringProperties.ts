/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const removeEmptyStringProperties = (
  obj: Record<string, any>
): Record<string, any> => {
  return Object.entries(obj)
    .filter(([_, value]) => value !== "")
    .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
};
