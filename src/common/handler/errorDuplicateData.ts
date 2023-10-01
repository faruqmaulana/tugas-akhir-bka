import { TRPCError } from "@trpc/server";

const errorDuplicateData = ({ property }: { property: string }) => {
  throw new TRPCError({
    code: "CONFLICT",
    message: `${property} telah digunakan, Hubungi admin jika mengalami kendala pada proses registrasi.`,
  });
};

export default errorDuplicateData;
