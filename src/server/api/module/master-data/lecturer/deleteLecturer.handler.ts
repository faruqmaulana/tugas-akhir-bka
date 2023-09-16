import { deleteRecord } from "~/common/schemas/global/deleteRecord.schema";
import { protectedProcedure } from "~/server/api/trpc";

const deleteLecturerHandle = protectedProcedure
  .input(deleteRecord)
  .mutation(async ({ ctx, input }) => {
    return await ctx.prisma.dosen.delete({
      where: { id: input.id },
    });
  });

export default deleteLecturerHandle;
