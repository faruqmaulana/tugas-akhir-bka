/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { userQuery } from "~/server/queries/module/user/user.query";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { hash, verify } from "argon2";
import { PASSWORD_NOT_MATCH, UPDATE_PROFILE_SUCCESS } from "~/common/message";
import { TRPCError } from "@trpc/server";
import { loginInformation, userProfileForm } from "~/common/schemas/user";
import { type Prisma, Role } from "@prisma/client";
import { STATUS } from "~/common/enums/STATUS";
import { z } from "zod";
import { userProfilePhoto } from "~/common/schemas/user/user-profile.schema";
import { stringToJSON } from "~/common/helpers/parseJSON";

export type allStudentsType = Prisma.UserGetPayload<{
  select: typeof userQuery & {
    isActive: true;
    _count: {
      select: {
        prestasiDataTables: {
          where: {
            PrestasiDataTable: {
              status: {
                equals: STATUS.APPROVE;
              };
            };
          };
        };
      };
    };
  };
}>[];

export type allStudentTableType = {
  name: string;
  email: string;
  phone: string;
  npm: string;
  fakultas: string;
  prodi: string;
  semester: string;
  total_prestasi: number;
  isActive: boolean;
};

export const userData = createTRPCRouter({
  //** GET ALL MAHASISWA
  getAllMahasiswaSelect: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.user.findMany({
        where: { role: Role.MAHASISWA, isActive: true },
        select: {
          id: true,
          name: true,
          npm: true,
          semester: true,
          prodi: {
            select: {
              name: true,
            },
          },
        },
      });
    } catch (error) {
      return error;
    }
  }),

  getAllMahasiswa: protectedProcedure.query(async ({ ctx }) => {
    try {
      const reqAllStudents = (await ctx.prisma.user.findMany({
        where: { role: Role.MAHASISWA },
        select: {
          ...userQuery,
          isActive: true,
          _count: {
            select: {
              prestasiDataTables: {
                where: {
                  PrestasiDataTable: {
                    status: {
                      equals: STATUS.APPROVE,
                    },
                  },
                },
              },
            },
          },
        },
      })) as allStudentsType;

      const allTransformedStudents = reqAllStudents.map((val) => {
        return {
          name: val.name,
          email: val.email,
          phone: val.phone,
          npm: val.npm,
          fakultas: val.prodi?.Fakultas.name,
          prodi: val.prodi?.name,
          semester: val.semester,
          total_prestasi: val._count.prestasiDataTables,
          isActive: val.isActive,
        };
      }) as allStudentTableType[];

      return allTransformedStudents;
    } catch (error) {
      return error;
    }
  }),

  //** GET USER PROFILE */
  getUserProfile: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.user.findUnique({
        where: { email: ctx.session?.user.email },
        select: { ...userQuery, accounts: { select: { provider: true } } },
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
          where: { email: ctx.session?.user.email },
          data: input,
          select: { ...userQuery, accounts: { select: { provider: true } } },
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
          where: { email: ctx.session?.user.email },
          select: { ...userQuery, password: true },
        });

        // CHECK IS VALID PASSWORD
        const isValidPassword = await verify(
          user?.password as string,
          password
        );

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

  //** UPDATE USER ACCOUNT FLAG */
  updateUserAccountFlag: protectedProcedure.query(async ({ ctx }) => {
    try {
      const user = await prisma?.user.findFirst({
        where: { email: ctx.session?.user.email },
      });

      if (!user) return true;
      // if user account is active then stop the process
      if (user?.isActive) return true;

      // update actived flag on user account
      await prisma?.user.update({
        where: {
          email: ctx.session?.user.email,
        },
        data: {
          isActive: true,
        },
      });

      return {
        message: UPDATE_PROFILE_SUCCESS,
      };
    } catch (error) {
      throw error;
    }
  }),

  //** UPDATE USER PROFILE */
  updateUserProfileBanner: protectedProcedure
    .input(z.string().optional())
    .mutation(async ({ ctx }) => {
      try {
        // DO UPDATE
        const data = await ctx.prisma.user.update({
          where: { email: ctx.session?.user.email },
          data: { isBannerOpen: false },
          select: { ...userQuery, accounts: { select: { provider: true } } },
        });

        return {
          message: UPDATE_PROFILE_SUCCESS,
          data,
        };
      } catch (error) {
        throw error;
      }
    }),

  //** UPDATE USER PHOTO */
  updateUserPhoto: protectedProcedure
    .input(userProfilePhoto)
    .mutation(async ({ ctx, input }) => {
      const { profilePhoto } = input;
      const profilePhotoMeta = stringToJSON(profilePhoto) || undefined;
      const photoUrl = (profilePhotoMeta as PrismaJson.FileResponse)
        ?.secure_url;
      try {
        // DO UPDATE
        const data = await ctx.prisma.user.update({
          where: { email: ctx.session?.user.email },
          data: {
            image: photoUrl,
            imageMeta: profilePhotoMeta,
          },
          select: { ...userQuery, accounts: { select: { provider: true } } },
        });

        return {
          message: "Photo " + UPDATE_PROFILE_SUCCESS,
          data,
        };
      } catch (error) {
        throw error;
      }
    }),
});
