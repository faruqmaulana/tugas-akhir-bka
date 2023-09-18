import { DELETE_SUCCESS } from "~/common/constants/MESSAGE";
import { deleteRecord } from "~/common/schemas/global/deleteRecord.schema";
import { protectedProcedure } from "~/server/api/trpc";

const deleteStudentOrganizationHandle = protectedProcedure
  .input(deleteRecord)
  .mutation(async ({ ctx, input }) => {
    const data = await ctx.prisma.masterDataOrkem.delete({
      where: { id: input.id },
    });

    return { message: `Data ${DELETE_SUCCESS}`, data };
  });

export default deleteStudentOrganizationHandle;
