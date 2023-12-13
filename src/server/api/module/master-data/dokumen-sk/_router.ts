import { createTRPCRouter } from "../../../trpc";
import getAllDokumenSKHandler from "./getAllDokumenSK.handler";

export const dokumenSKQuery = createTRPCRouter({
  getAllDokumenSK: getAllDokumenSKHandler,
});
