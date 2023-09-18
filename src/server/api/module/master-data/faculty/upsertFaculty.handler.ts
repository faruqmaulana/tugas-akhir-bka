import { ADD_SUCCESS, UPDATE_SUCCESS } from "~/common/message";
import { facultySchema } from "~/common/schemas/module/master-data/faculty.schema";
import { protectedProcedure } from "~/server/api/trpc";

const upsertLecturerHandle = protectedProcedure
  .input(facultySchema)
  .mutation(async ({ ctx, input }) => {
    const { id, name } = input;
    const payload = { name };

    const data = await ctx.prisma.masterDataFakultas.upsert({
      where: { id },
      update: payload,
      create: payload,
    });

    return { message: id ? `Data ${UPDATE_SUCCESS}` : ADD_SUCCESS, data };
  });

export default upsertLecturerHandle;
