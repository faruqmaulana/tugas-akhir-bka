import { userQuery } from "~/server/queries/module/user/user.query";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { loginInformation } from "~/common/schemas/user/login-information.schema";
import { verify } from "argon2";
import { CustomError } from "~/common/types/custom";
import { PASSWORD_NOT_MATCH, UPDATE_PROFILE_SUCCESS } from "~/common/message";
import { TRPCError } from "@trpc/server";

export const userData = createTRPCRouter({
  userProfile: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.user.findUnique({
        where: { id: ctx.session?.user.userId },
        select: userQuery,
      });
    } catch (error) {
      console.log("error", error);
    }
  }),

  // UPDATE INFORMATION LOGIN
  updateLoginInformation: protectedProcedure
    .input(loginInformation)
    .mutation(async ({ ctx, input }) => {
      try {
        const { password } = input;
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.session?.user.userId },
          select: { ...userQuery, password: true },
        });

        // check password is correct
        const isValidPassword = await verify(user!.password, password);
        if (!isValidPassword && password !== "") {
          // throw new TRPCError({
          //   code: "INTERNAL_SERVER_ERROR",
          //   message: "An unexpected error occurred, please try again later.",
          //   // optional: pass the original error to retain stack trace
          // });
          return new CustomError(PASSWORD_NOT_MATCH);
        }

        await ctx.prisma.user.update({
          where: {
            id: ctx.session?.user.userId,
          },
          data: {
            name: input.name,
          },
        });

        return {
          message: UPDATE_PROFILE_SUCCESS,
        };
      } catch (error) {
        console.log("error", error);
      }
    }),
});
