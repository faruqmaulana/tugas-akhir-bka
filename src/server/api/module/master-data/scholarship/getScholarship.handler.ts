import { protectedProcedure } from "~/server/api/trpc";

const getScholarshipHandler = protectedProcedure.query(async ({ ctx }) => {
  try {
    return await ctx.prisma.beasiswa.findFirst();
  } catch (error) {
    return error;
  }
});

export default getScholarshipHandler;
