import { userQuery } from "~/server/queries/module/user/user.query";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { hash, verify } from "argon2";
import { PASSWORD_NOT_MATCH, UPDATE_PROFILE_SUCCESS } from "~/common/message";
import { TRPCError } from "@trpc/server";
import { removeEmptyStringProperties } from "~/common/helpers/removeEmptyStringProperties";
import { loginInformation, userProfileForm } from "~/common/schemas/user";

export const userData = createTRPCRouter({
  //** GET USER PROFILE */
  getUserProfile: protectedProcedure.query(async ({ ctx }) => {
    try {
      console.log("ctx.session", ctx.session);
      return await ctx.prisma.user.findUnique({
        where: { id: ctx.session?.user.userId },
        select: userQuery,
      });
    } catch (error) {
      return error;
    }
  }),

  //** UPDATE USER PROFILE */
  updateUserProfile: protectedProcedure
    .input(userProfileForm)
    .mutation(async ({ ctx, input }) => {
      try {
        // DO UPDATE
        const data = await ctx.prisma.user.update({
          where: {
            id: ctx.session?.user.userId,
          },
          data: removeEmptyStringProperties(input),
          select: userQuery,
        });

        return {
          message: UPDATE_PROFILE_SUCCESS,
          data,
        };
      } catch (error) {
        throw error;
      }
    }),

  //** UPDATE INFORMATION LOGIN */
  updateUserPassword: protectedProcedure
    .input(loginInformation)
    .mutation(async ({ ctx, input }) => {
      try {
        const { password, passwordConfirmation } = input;
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.session?.user.userId },
          select: { ...userQuery, password: true },
        });

        // CHECK IS VALID PASSWORD
        const isValidPassword = await verify(user!.password, password);

        if (!isValidPassword && password !== "") {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: PASSWORD_NOT_MATCH,
          });
        }

        // DO UPDATE PASSWORD
        const data = await ctx.prisma.user.update({
          where: {
            id: ctx.session?.user.userId,
          },
          data: { password: await hash(passwordConfirmation) },
          select: userQuery,
        });

        return {
          message: UPDATE_PROFILE_SUCCESS,
          data,
        };
      } catch (error) {
        throw error;
      }
    }),
});
