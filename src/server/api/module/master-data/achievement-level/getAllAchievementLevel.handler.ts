import { protectedProcedure } from "~/server/api/trpc";
import { type AllAchievementLevelType } from "./_router";

const getAllChampionshipLevelHandle = protectedProcedure.query(
  async ({ ctx }) => {
    try {
      return (await ctx.prisma.masterDataTingkatPrestasi.findMany({
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              PrestasiDataTable: true,
            },
          },
        },
      })) as AllAchievementLevelType;
    } catch (error) {
      return error;
    }
  }
);

export default getAllChampionshipLevelHandle;
