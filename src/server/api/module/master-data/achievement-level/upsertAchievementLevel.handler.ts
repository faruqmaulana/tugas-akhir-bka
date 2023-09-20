import { ADD_SUCCESS, UPDATE_SUCCESS } from "~/common/message";
import { achievementLevelSchema } from "~/common/schemas/module/master-data/achievement-level.schema";
import { protectedProcedure } from "~/server/api/trpc";

const upsertAchievementLevelHandle = protectedProcedure
  .input(achievementLevelSchema)
  .mutation(async ({ ctx, input }) => {
    const { id, name } = input;
    const payload = { name };

    const data = await ctx.prisma.masterDataTingkatPrestasi.upsert({
      where: { id },
      update: payload,
      create: payload,
    });

    return { message: id ? `Data ${UPDATE_SUCCESS}` : ADD_SUCCESS, data };
  });

export default upsertAchievementLevelHandle;
