import { TRPCError } from "@trpc/server";

const errorDuplicateData = ({
  property,
  addUserData = false,
}: {
  property: string;
  addUserData?: boolean;
}) => {
  const customMessage = () => {
    if (addUserData) return "telah digunakan.";
    return "telah digunakan, Hubungi admin jika mengalami kendala pada proses registrasi.";
  };

  throw new TRPCError({
    code: "CONFLICT",
    message: `${property} ${customMessage()}`,
  });
};

export default errorDuplicateData;
