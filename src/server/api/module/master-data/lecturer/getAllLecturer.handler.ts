import { protectedProcedure } from "~/server/api/trpc";
import { type AllDosenType } from "./_router";

const getAllLecturerHandle = protectedProcedure.query(async ({ ctx }) => {
  try {
    return (await ctx.prisma.dosen.findMany({
      orderBy: { updatedAt: "desc" },
      include: { prodi: { include: { Fakultas: true } } },
    })) as AllDosenType;
  } catch (error) {
    return error;
  }
});

export default getAllLecturerHandle;
