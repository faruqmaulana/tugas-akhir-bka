import { protectedProcedure } from "~/server/api/trpc";
import { type AllChampionshipLevelType } from "./_router";

const getAllChampionshipLevelHandle = protectedProcedure.query(
  async ({ ctx }) => {
    try {
      return (await ctx.prisma.masterDataTingkatKejuaraan.findMany({
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
      })) as AllChampionshipLevelType;
    } catch (error) {
      return error;
    }
  }
);

export default getAllChampionshipLevelHandle;
