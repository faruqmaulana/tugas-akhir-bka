import { protectedProcedure } from "~/server/api/trpc";
import { type AllStudentOrganizationType } from "./_router";

const getAllStudentOrganizationHandle = protectedProcedure.query(
  async ({ ctx }) => {
    try {
      return (await ctx.prisma.masterDataOrkem.findMany({
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              PrestasiDataTable: true,
            },
          },
        },
      })) as AllStudentOrganizationType;
    } catch (error) {
      return error;
    }
  }
);

export default getAllStudentOrganizationHandle;
