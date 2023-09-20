import { protectedProcedure } from "~/server/api/trpc";
import { type AllFacultyType } from "./_router";

const getAllFacultyHandle = protectedProcedure.query(async ({ ctx }) => {
  try {
    return (await ctx.prisma.masterDataFakultas.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        prodi: true,
      },
    })) as AllFacultyType;
  } catch (error) {
    return error;
  }
});

export default getAllFacultyHandle;
