import { lecturerSchema } from "~/common/schemas/module/master-data/lecturer/lecturer.schema";
import { protectedProcedure } from "~/server/api/trpc";

const updateLecturerHandle = protectedProcedure
  .input(lecturerSchema)
  .mutation(async ({ ctx, input }) => {
    return await ctx.prisma.dosen.update({
      where: { id: input.id },
      data: input,
    });
  });

export default updateLecturerHandle;
