import { TRPCError } from "@trpc/server";

const errorDuplicateData = ({ property }: { property: string }) => {
  throw new TRPCError({
    code: "CONFLICT",
    message: `${property} telah digunakan!.`,
  });
};

export default errorDuplicateData;
