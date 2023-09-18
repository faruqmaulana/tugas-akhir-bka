import { protectedProcedure } from "~/server/api/trpc";
import { type AllStudyProgramType } from "./_router";

const getAllStudyProgramHandle = protectedProcedure.query(async ({ ctx }) => {
  try {
    return (await ctx.prisma.masterDataProdi.findMany({
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        name: true,
        Fakultas: true,
        fakultasId: true,
        _count: {
          select: {
            user: true,
          },
        },
      },
    })) as AllStudyProgramType;
  } catch (error) {
    return error;
  }
});

export default getAllStudyProgramHandle;
