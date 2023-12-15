import { userQuery } from "~/server/queries/module/user/user.query";
import { protectedProcedure } from "../../../trpc";
import { changeDateFormat } from "~/common/helpers/changeDateFormat";

const getAllScholarshipHandler = protectedProcedure.query(async ({ ctx }) => {
  try {
    const isAdmin = ctx.session.user.role === "ADMIN";
    const getAllScholarship = await ctx.prisma.pengajuanBeasiswa.findMany({
      where: isAdmin ? {} : { userId: ctx.session.user.userId },
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        user: {
          select: userQuery,
        },
      },
    });

    const transformedScholarship = getAllScholarship.map((val) => {
      return {
        id: val?.id,
        status: val?.status,
        namaMahasiswa: val?.user?.name,
        prodi: val?.user?.prodi?.name,
        fakultas: val?.user?.prodi?.Fakultas.name,
        semester: val?.user?.semester,
        deskripsi: val?.description,
        dokumenPendukung:
          (val?.dokumen as PrismaJson.FileResponse)?.secure_url || "-",
        tanggalPengajuan: changeDateFormat(val?.createdAt),
        nbi: val?.user?.npm,
      };
    });

    return transformedScholarship;
  } catch (error) {
    return error;
  }
});

export default getAllScholarshipHandler;
