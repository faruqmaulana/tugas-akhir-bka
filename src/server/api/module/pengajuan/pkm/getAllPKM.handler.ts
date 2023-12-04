import { type Prisma } from "@prisma/client";
import { Role } from "@prisma/client";
import { type PkmType } from "~/common/constants/DUMMY_PKM";
import { changeDateFormat } from "~/common/helpers/changeDateFormat";
import changeToIDR from "~/common/helpers/changeToIDR";
import removeDuplicates from "~/common/helpers/removeDuplicates";
import { protectedProcedure } from "~/server/api/trpc";
import { userQuery } from "~/server/queries/module/user/user.query";

export type pkmQueryType = Prisma.PengajuanOnUsersGetPayload<{
  where: {
    NOT: { PengajuanPKMId: null };
  };
  orderBy: {
    PengajuanPKM: { updatedAt: "desc" };
  };
  include: {
    PengajuanPKM: {
      include: {
        dosen: { select: { name: true } };
        suratKeputusan: true;
      };
    };
    user: { select: typeof userQuery };
  };
}>;

const getAllPKMHandler = protectedProcedure.query(async ({ ctx }) => {
  const isMahasiswa = ctx.session.user.role === Role.MAHASISWA;

  const handleQuery = () => {
    // handle if user didn't add status to filter data
    if (isMahasiswa) {
      return {
        NOT: { PengajuanPKMId: null },
        userId: { equals: ctx.session.user.userId },
      };
    }

    return { NOT: { PengajuanPKMId: null } };
  };

  try {
    const allPKMData = await ctx.prisma.pengajuanOnUsers.findMany({
      where: handleQuery(),
      orderBy: {
        PengajuanPKM: { updatedAt: "desc" },
      },
      include: {
        PengajuanPKM: {
          include: {
            dosen: { select: { name: true } },
            suratKeputusan: true,
          },
        },
        user: { select: userQuery },
      },
    });

    const transformedHakiData = allPKMData.map((data) => {
      const { user } = data || {};

      const {
        id,
        judul,
        deskripsi,
        totalAnggaran,
        dokumenProposal,
        suratKeputusan,
        status,
        tanggalKegiatan,
        dosen,
      } = data?.PengajuanPKM || {};

      return {
        id,
        judul,
        deskripsi,
        noSK: suratKeputusan?.nomorSK || "-",
        tanggalSK: changeDateFormat(suratKeputusan?.tanggalSK),
        suratKeputusan:
          (suratKeputusan?.dokumenSK as PrismaJson.FileResponse)?.secure_url ||
          "-",
        namaMahasiswa: user?.name,
        npm: user?.npm,
        tanggalKegiatan: changeDateFormat(tanggalKegiatan),
        proposal:
          (dokumenProposal as PrismaJson.FileResponse)?.secure_url || "-",
        totalAnggaran: totalAnggaran ? changeToIDR(Number(totalAnggaran)) : "-",
        status,
        dosen: dosen?.name,
      } as PkmType;
    });

    // remove duplicate
    const filteredData = removeDuplicates(transformedHakiData, "id");

    return filteredData as typeof transformedHakiData;
  } catch (error) {
    return error;
  }
});

export default getAllPKMHandler;
