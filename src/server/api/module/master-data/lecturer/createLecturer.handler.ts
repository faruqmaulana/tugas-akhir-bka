import { lecturerSchema } from "~/common/schemas/module/master-data/lecturer/lecturer.schema";
import { protectedProcedure } from "~/server/api/trpc";

const createLecturerHandle = protectedProcedure
  .input(lecturerSchema)
  .mutation(async ({ ctx, input }) => {
    return await ctx.prisma.dosen.create({
      data: input,
    });
  });

export default createLecturerHandle;
