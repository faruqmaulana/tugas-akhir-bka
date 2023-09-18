import { ADD_SUCCESS, UPDATE_SUCCESS } from "~/common/message";
import { studyProgramSchema } from "~/common/schemas/module/master-data/study-program.schema";
import { protectedProcedure } from "~/server/api/trpc";

const upsertStudyProgramHandle = protectedProcedure
  .input(studyProgramSchema)
  .mutation(async ({ ctx, input }) => {
    const { id, name, fakultasId } = input;
    const payload = { name, fakultasId };

    const data = await ctx.prisma.masterDataProdi.upsert({
      where: { id },
      update: payload,
      create: payload,
    });

    return { message: id ? `Data ${UPDATE_SUCCESS}` : ADD_SUCCESS, data };
  });

export default upsertStudyProgramHandle;
