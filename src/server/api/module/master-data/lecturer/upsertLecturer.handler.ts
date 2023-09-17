import { ADD_SUCCESS, UPDATE_SUCCESS } from "~/common/message";
import { lecturerSchema } from "~/common/schemas/module/master-data/lecturer/lecturer.schema";
import { protectedProcedure } from "~/server/api/trpc";

const upsertLecturerHandle = protectedProcedure
  .input(lecturerSchema)
  .mutation(async ({ ctx, input }) => {
    const { id, name, nidn, prodiId } = input;
    const payload = { name, nidn, prodiId };

    const data = await ctx.prisma.dosen.upsert({
      where: { id },
      update: payload,
      create: payload,
    });

    return { message: id ? `Data ${UPDATE_SUCCESS}` : ADD_SUCCESS, data };
  });

export default upsertLecturerHandle;
