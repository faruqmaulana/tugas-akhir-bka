import { type Prisma } from "@prisma/client";
import { Role } from "@prisma/client";
import capitalizeFirstLetter from "~/common/helpers/capitalizeFirstLetter";
import { changeDateFormat } from "~/common/helpers/changeDateFormat";
import { getDateRange } from "~/common/helpers/getDateRange";
import removeDuplicates from "~/common/helpers/removeDuplicates";
import { hakiPatenFilterSchema } from "~/common/schemas/module/pengajuan/haki/hakipatenfilter-application.schema";
import { protectedProcedure } from "~/server/api/trpc";

export type hakiAndPatenType = Prisma.PengajuanOnUsersGetPayload<{
  where: {
    NOT: { PengajuanPatenAndHakiTableId: null };
  };
  orderBy: {
    PengajuanPatenAndHakiTable: { updatedAt: "desc" };
  };
  include: {
    PengajuanPatenAndHakiTable: {
      include: {
        user: { select: { name: true } };
      };
    };
  };
}>;

const getAllPKMHandler = protectedProcedure
  .input(hakiPatenFilterSchema)
  .query(async ({ ctx, input }) => {
    const { status, type } = input;
    const isMahasiswa = ctx.session.user.role === Role.MAHASISWA;

    const handleQuery = () => {
      // handle if user add status to filter data
      if (status) {
        return {
          NOT: { PengajuanPatenAndHakiTableId: null },
          PengajuanPatenAndHakiTable: {
            status: { equals: status },
            jenis: type,
          },
        };
      }

      // handle if user didn't add status to filter data
      if (isMahasiswa && !status) {
        return {
          NOT: { PengajuanPatenAndHakiTableId: null },
          userId: { equals: ctx.session.user.userId },
          PengajuanPatenAndHakiTable: { jenis: type },
        };
      }

      return { NOT: { PengajuanPatenAndHakiTableId: null } };
    };

    try {
      const allHakiData = (await ctx.prisma.pengajuanOnUsers.findMany({
        where: handleQuery(),
        orderBy: {
          PengajuanPatenAndHakiTable: { updatedAt: "desc" },
        },
        include: {
          PengajuanPatenAndHakiTable: {
            include: {
              user: { select: { name: true } },
            },
          },
        },
      })) as hakiAndPatenType[];

      const transformedHakiData = allHakiData.map((data) => {
        const {
          id,
          jenis,
          judul,
          dokumenPendukung,
          dokumenTambahan,
          nomorPaten,
          expiredDate,
          user,
          createdAt,
          status,
          keterangan,
        } = data?.PengajuanPatenAndHakiTable || {};

        return {
          id,
          judul,
          keterangan,
          status,
          jenis: capitalizeFirstLetter(jenis),
          nomorPaten: nomorPaten || "-",
          dokumenPendukung:
            (dokumenPendukung as PrismaJson.FileResponse)?.secure_url || "-",
          dokumenTambahan:
            (dokumenTambahan as PrismaJson.FileResponse)?.secure_url || "-",
          pengajuHaki: user?.name,
          tanggalPendaftaran: changeDateFormat(createdAt),
          validPeriod: getDateRange({ createdAt, expiredDate }),
          statusDokumen: getDateRange({
            createdAt,
            expiredDate,
            type: "GET_EXPIRED_STATUS",
          }),
          tanggalKadaluarsa: changeDateFormat(expiredDate),
        };
      });

      // remove duplicate
      const filteredData = removeDuplicates(transformedHakiData, "id");

      return filteredData as typeof transformedHakiData;
    } catch (error) {
      return error;
    }
  });

export default getAllPKMHandler;
