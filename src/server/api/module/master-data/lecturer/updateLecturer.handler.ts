import { UPDATE_SUCCESS } from "~/common/message";
import { lecturerSchema } from "~/common/schemas/module/master-data/lecturer/lecturer.schema";
import { protectedProcedure } from "~/server/api/trpc";

const updateLecturerHandle = protectedProcedure
  .input(lecturerSchema)
  .mutation(async ({ ctx, input }) => {
    const data = await ctx.prisma.dosen.update({
      where: { id: input.id },
      data: input,
    });

    return { message: `Data ${UPDATE_SUCCESS}`, data };
  });

export default updateLecturerHandle;
