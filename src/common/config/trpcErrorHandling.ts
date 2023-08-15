import { TRPCError } from "@trpc/server";
import { type TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";

type CustomTrpcErrorType = { code?: TRPC_ERROR_CODE_KEY; message: string };

export const CustomTrpcError = (props: CustomTrpcErrorType) => {
  const { code = "UNPROCESSABLE_CONTENT", message } = props;
  throw new TRPCError({
    code,
    message,
  });
};
