import { userQuery } from "~/server/queries/module/user/user.query";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const userData = createTRPCRouter({
  userProfile: protectedProcedure.query(async ({ ctx }) => {
    console.log("ctx.session?.user", ctx.session?.user);
    try {
      const a = await ctx.prisma.user.findUnique({
        where: { id: ctx.session?.user.userId },
        select: userQuery,
      });

      console.log("a", a);

      return a;
    } catch (error) {
      console.log("error", error);
    }
  }),
});
