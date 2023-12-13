import {
  changeDateFormat,
  changeDateFormatToNumeric,
} from "~/common/helpers/changeDateFormat";
import { protectedProcedure } from "~/server/api/trpc";

export type DokumenSkType = {
  nomorSK: string;
  tanggalSK: string;
  dokumenSK?: string;
  tanggalUpload: string;
};

const getAllDokumenSKHandler = protectedProcedure.query(async ({ ctx }) => {
  try {
    const dokumenSk = await ctx.prisma.dokumenSKMeta.findMany({
      orderBy: { updatedAt: "desc" },
    });

    const transformedPrestasiData = dokumenSk.map((val) => {
      return {
        nomorSK: val.nomorSK,
        tanggalSK: changeDateFormat(val?.tanggalSK),
        dokumenSK:
          (val.dokumenSK as PrismaJson.FileResponse)?.secure_url || "-",
        tanggalUpload: changeDateFormatToNumeric(val?.updatedAt),
      };
    });

    return transformedPrestasiData;
  } catch (error) {
    return error;
  }
});

export default getAllDokumenSKHandler;
