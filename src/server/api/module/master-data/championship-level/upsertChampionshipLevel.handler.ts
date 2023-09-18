import { ADD_SUCCESS, UPDATE_SUCCESS } from "~/common/message";
import { championshipLevelSchema } from "~/common/schemas/module/master-data/championship-level.schema";
import { protectedProcedure } from "~/server/api/trpc";

const upsertChampionshipLevelHandle = protectedProcedure
  .input(championshipLevelSchema)
  .mutation(async ({ ctx, input }) => {
    const { id, name } = input;
    const payload = { name };

    const data = await ctx.prisma.masterDataTingkatKejuaraan.upsert({
      where: { id },
      update: payload,
      create: payload,
    });

    return { message: id ? `Data ${UPDATE_SUCCESS}` : ADD_SUCCESS, data };
  });

export default upsertChampionshipLevelHandle;
