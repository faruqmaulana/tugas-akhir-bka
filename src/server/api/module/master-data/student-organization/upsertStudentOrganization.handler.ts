import { ADD_SUCCESS, UPDATE_SUCCESS } from "~/common/message";
import { studentOrganizationSchema } from "~/common/schemas/module/master-data/studentOrganization.schema";
import { protectedProcedure } from "~/server/api/trpc";

const upsertStudentOrganizationHandle = protectedProcedure
  .input(studentOrganizationSchema)
  .mutation(async ({ ctx, input }) => {
    const { id, name } = input;
    const payload = { name };

    const data = await ctx.prisma.masterDataOrkem.upsert({
      where: { id },
      update: payload,
      create: payload,
    });

    return { message: id ? `Data ${UPDATE_SUCCESS}` : ADD_SUCCESS, data };
  });

export default upsertStudentOrganizationHandle;
